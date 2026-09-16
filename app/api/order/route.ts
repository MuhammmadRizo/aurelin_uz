import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { products } from '@/data/products';

interface OrderItem {
  id: string;
  name: string;
  slug?: string;
  image?: string;
  size: string;
  quantity: number;
  price: number;
}

interface OrderPayload {
  customerName: string;
  phone: string;
  address?: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export async function POST(request: Request) {
  try {
    const data: OrderPayload = await request.json();

    if (!data.phone || !data.phone.trim()) {
      return NextResponse.json(
        { error: 'Telefon raqam kiritilishi shart' },
        { status: 400 }
      );
    }

    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Savatchada mahsulotlar mavjud emas' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Format current date and time in Tashkent timezone
    const orderDate = new Date().toLocaleString('uz-UZ', {
      timeZone: 'Asia/Tashkent',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Format items list for Telegram HTML message (without link)
    const itemsText = data.items
      .map((item, index) => {
        const itemTotal = (item.price * item.quantity).toLocaleString('uz-UZ');
        return `${index + 1}. <b>${item.name}</b>\n   • O‘lcham: <code>${item.size}</code>\n   • Miqdori: <b>${item.quantity} dona</b>\n   • Narxi: <b>${itemTotal} so‘m</b>`;
      })
      .join('\n\n');

    const message = `🛍 <b>YANGI BUYURTMA — SCHAUBLETES</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Mijoz:</b> ${data.customerName || 'Ism kiritilmagan'}
📞 <b>Telefon:</b> <code>${data.phone}</code>
📍 <b>Manzil:</b> ${data.address?.trim() ? data.address.trim() : 'Kiritilmagan'}
📝 <b>Izoh:</b> ${data.notes?.trim() ? data.notes.trim() : 'Mavjud emas'}

📦 <b>Buyurtma tarkibi:</b>
${itemsText}

━━━━━━━━━━━━━━━━━━━━
💰 <b>Oraliq jami:</b> ${data.subtotal.toLocaleString('uz-UZ')} so‘m
🚚 <b>Yetkazib berish:</b> ${data.shipping === 0 ? 'Bepul' : `${data.shipping.toLocaleString('uz-UZ')} so‘m`}
💳 <b>Umumiy to‘lov:</b> <b>${data.total.toLocaleString('uz-UZ')} so‘m</b>
📅 <b>Buyurtma vaqti:</b> ${orderDate}`;

    let telegramSent = false;
    let telegramError: string | null = null;

    if (botToken && chatId) {
      try {
        // Collect local image files for ordered items
        const findLocalImagePath = (relPath?: string): string | null => {
          if (!relPath) return null;
          const cleanPath = relPath.startsWith('/') ? relPath.slice(1) : relPath;
          const absPath = path.join(process.cwd(), 'public', cleanPath);
          if (fs.existsSync(absPath)) {
            return absPath;
          }
          return null;
        };

        const imageFiles: { filePath: string; name: string }[] = [];
        const seenPaths = new Set<string>();

        for (const item of data.items) {
          const candidatePath =
            item.image ||
            products.find((p) => p.id === item.id || p.slug === item.slug)?.image;
          const resolved = findLocalImagePath(candidatePath);
          if (resolved && !seenPaths.has(resolved)) {
            seenPaths.add(resolved);
            imageFiles.push({ filePath: resolved, name: item.name });
          }
        }

        if (imageFiles.length === 1) {
          // Exactly 1 product image: sendPhoto
          const img = imageFiles[0];
          const fileBuffer = fs.readFileSync(img.filePath);
          const ext = path.extname(img.filePath).toLowerCase();
          const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
          const blob = new Blob([fileBuffer], { type: mimeType });

          const formData = new FormData();
          formData.append('chat_id', chatId);
          formData.append('photo', blob, path.basename(img.filePath));

          if (message.length <= 1024) {
            formData.append('caption', message);
            formData.append('parse_mode', 'HTML');

            const tgRes = await fetch(
              `https://api.telegram.org/bot${botToken}/sendPhoto`,
              {
                method: 'POST',
                body: formData,
              }
            );
            const tgJson = await tgRes.json();
            if (tgJson.ok) {
              telegramSent = true;
            } else {
              telegramError = tgJson.description;
              console.error('[Telegram sendPhoto Error]:', tgJson);
            }
          } else {
            // Caption exceeds 1024 chars: send photo with short info, then full text
            const shortCaption = `🛍 <b>YANGI BUYURTMA — SCHAUBLETES</b>\n👤 Mijoz: <b>${data.customerName || 'Mijoz'}</b>\n📞 Tel: <code>${data.phone}</code>\n💳 Jami: <b>${data.total.toLocaleString('uz-UZ')} so‘m</b>`;
            formData.append('caption', shortCaption);
            formData.append('parse_mode', 'HTML');

            await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
              method: 'POST',
              body: formData,
            });

            // Send full message
            const textRes = await fetch(
              `https://api.telegram.org/bot${botToken}/sendMessage`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: message,
                  parse_mode: 'HTML',
                }),
              }
            );
            const textJson = await textRes.json();
            telegramSent = textJson.ok;
          }
        } else if (imageFiles.length > 1) {
          // Multiple products: sendMediaGroup (up to 10 photos)
          const selectedFiles = imageFiles.slice(0, 10);
          const formData = new FormData();
          formData.append('chat_id', chatId);

          const media = selectedFiles.map((f, idx) => {
            const entry: Record<string, unknown> = {
              type: 'photo',
              media: `attach://photo_${idx}`,
            };
            if (idx === 0) {
              if (message.length <= 1024) {
                entry.caption = message;
                entry.parse_mode = 'HTML';
              } else {
                entry.caption = `🛍 <b>YANGI BUYURTMA — SCHAUBLETES</b>\n👤 Mijoz: <b>${data.customerName || 'Mijoz'}</b>\n📞 Tel: <code>${data.phone}</code>\n💳 Jami: <b>${data.total.toLocaleString('uz-UZ')} so‘m</b>`;
                entry.parse_mode = 'HTML';
              }
            }
            return entry;
          });

          formData.append('media', JSON.stringify(media));

          selectedFiles.forEach((f, idx) => {
            const fileBuffer = fs.readFileSync(f.filePath);
            const ext = path.extname(f.filePath).toLowerCase();
            const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
            const blob = new Blob([fileBuffer], { type: mimeType });
            formData.append(`photo_${idx}`, blob, path.basename(f.filePath));
          });

          const groupRes = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
            {
              method: 'POST',
              body: formData,
            }
          );
          const groupJson = await groupRes.json();
          if (groupJson.ok) {
            telegramSent = true;
            if (message.length > 1024) {
              await fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML',
                  }),
                }
              );
            }
          } else {
            telegramError = groupJson.description;
            console.error('[Telegram sendMediaGroup Error]:', groupJson);
          }
        } else {
          // Fallback: no image found, send standard text message
          const tgRes = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
              }),
            }
          );
          const tgJson = await tgRes.json();
          if (tgJson.ok) {
            telegramSent = true;
          } else {
            telegramError = tgJson.description;
          }
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        telegramError = errMsg;
        console.error('[Telegram API Network Error]:', err);

        // Emergency text fallback if image upload fails
        try {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'HTML',
            }),
          });
          telegramSent = true;
        } catch {
          // ignore
        }
      }
    } else {
      console.log('--- [YANGI BUYURTMA QABUL QILINDI] ---');
      console.log(message);
      console.log('---------------------------------------');
      console.log(
        'Eslatma: .env.local faylida TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID sozlanmagan.'
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Buyurtmangiz muvaffaqiyatli qabul qilindi!',
      telegramSent,
      telegramError,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('[Order Processing Error]:', error);
    return NextResponse.json(
      { error: 'Buyurtmani qayta ishlashda xatolik yuz berdi: ' + errMsg },
      { status: 500 }
    );
  }
}
