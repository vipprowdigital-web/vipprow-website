// backend/src/services/email.service.js

import { Resend } from "resend";

const FROM_EMAIL = "Vipprow <noreply@mail.croissix.com>";

/**
 * Sends a newsletter confirmation email to a newly subscribed user.
 * @param {Object} params
 * @param {string} params.email
 */
export async function sendNewsletterSubscriptionEmail({ email }) {
  const resendClient = () => new Resend(process.env.RESEND_API_KEY);
  const resend = resendClient();
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "You're in! Welcome to the Vipprow Newsletter 🚀",
      html: buildNewsletterTemplate({ email }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    console.log("✅ Newsletter subscription email sent:", data?.id);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Email service error:", err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Sends an update notification email to a subscriber about a newly published article.
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.articleTitle
 * @param {string} params.category
 * @param {string} params.articleUrl
 */
export async function sendNewArticleNotificationEmail({
  email,
  articleTitle,
  category,
  articleUrl,
}) {
  const resendClient = () => new Resend(process.env.RESEND_API_KEY);
  const resend = resendClient();
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `New in ${category}: ${articleTitle} 📚`,
      html: buildNewArticleTemplate({ articleTitle, category, articleUrl }),
    });

    if (error) {
      console.error("Resend notification error:", error);
      return { success: false, error };
    }

    console.log(`✅ New article notification sent to ${email}:`, data?.id);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("Email notification service error:", err.message);
    return { success: false, error: err.message };
  }
}

// ─── HTML TEMPLATE: SUBSCRIPTION CONFIRMATION ─────────────────────────────────
function buildNewsletterTemplate({ email }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thanks for Subscribing</title>
</head>
<body style="margin:0; padding:0; background-color:#252525; font-family: 'Poppins', 'Inter', Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#252525; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #353535; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: left;">
              <div style="margin-bottom: 24px;">
                <span style="color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">VIPPROW</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; line-height: 1.3;">Thanks for subscribing!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="margin: 0 0 20px 0; color: #b5b5b5; font-size: 15px; line-height: 1.6;">
                You have successfully joined the Vipprow newsletter. From now on, you'll be the first to receive updates on our latest insights, platform features, and tech trends straight to your inbox.
              </p>
              <div style="background-color: #2b2b2b; border-radius: 8px; padding: 16px 20px; margin-bottom: 30px; border: 1px solid rgba(255,255,255,0.05); text-align: left;">
                <div style="color: #858585; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Subscribed As</div>
                <div style="color: #ffffff; font-size: 14px; font-weight: 500; word-break: break-all;">${email}</div>
              </div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left">
                    <a href="https://vipprow.com" style="display: inline-block; background-color: #ffffff; color: #252525; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 6px;">Explore Our Platform →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
  <td
    style="
      background-color: #2b2b2b;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding: 28px 40px;
      text-align: left;
    "
  >
    <p
      style="
        margin: 0 0 18px 0;
        color: #707070;
        font-size: 12px;
        line-height: 1.6;
      "
    >
      You received this email because you subscribed to newsletter updates on
      the Vipprow website.
    </p>

    <!-- Unsubscribe Button -->
    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="left">
          <a
            href="${process.env.NEXT_FRONTEND_URL}/unsubscribe"
            style="
              display: inline-block;
              padding: 11px 22px;
              background-color: transparent;
              border: 1px solid rgba(255,255,255,0.12);
              border-radius: 999px;
              color: #b5b5b5;
              text-decoration: none;
              font-size: 13px;
              font-weight: 500;
              letter-spacing: 0.2px;
              transition: all 0.3s ease;
            "
          >
            Unsubscribe from Newsletter
          </a>
        </td>
      </tr>
    </table>

    <!-- Divider -->
    <div
      style="
        height: 1px;
        background-color: rgba(255,255,255,0.05);
        margin: 22px 0 18px 0;
      "
    ></div>

    <p
      style="
        margin: 0;
        color: #5f5f5f;
        font-size: 12px;
        line-height: 1.5;
      "
    >
      &copy; ${new Date().getFullYear()} Vipprow. All rights reserved.
    </p>
  </td>
</tr>
          </table>
          </td>
          </tr>
          </table>
          </body>
          </html>
          `.trim();
}

//   <tr>
//     <td style="background-color: #2b2b2b; border-top: 1px solid rgba(255,255,255,0.05); padding: 24px 40px; text-align: left;">
//       <p style="margin: 0 0 6px 0; color: #707070; font-size: 12px; line-height: 1.4;">You received this email because you signed up for newsletter updates on the Vipprow website.</p>
//       <p style="margin: 0; color: #707070; font-size: 12px;">&copy; ${new Date().getFullYear()} Vipprow. All rights reserved.</p>
//     </td>
//   </tr>
// ─── HTML TEMPLATE: ARTICLE UPDATE ────────────────────────────────────────────
function buildNewArticleTemplate({ articleTitle, category, articleUrl }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Fresh Content Inside</title>
</head>
<body style="margin:0; padding:0; background-color:#252525; font-family: 'Poppins', 'Inter', Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#252525; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #353535; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: left;">
              <div style="margin-bottom: 24px;">
                <span style="color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">VIPPROW</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; line-height: 1.3;">Fresh Content is Live!</h1>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="margin: 0 0 24px 0; color: #b5b5b5; font-size: 15px; line-height: 1.6;">
                We just published a brand new piece that might catch your eye. Dive into the latest strategies, break down implementation details, and explore the breakdown below:
              </p>
              
              <!-- Two-Line Block Layout for Mobile Optimization -->
              <div style="background-color: #2b2b2b; border-radius: 8px; padding: 20px; margin-bottom: 30px; border: 1px solid rgba(255,255,255,0.05); text-align: left;">
                <div style="color: #858585; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
                  Category: <span style="color: #ffffff; font-weight: 500; letter-spacing: 0px; text-transform: none; margin-left: 4px;">${category}</span>
                </div>
                <div style="color: #ffffff; font-size: 17px; font-weight: 600; line-height: 1.4; margin-top: 8px;">
                  ${articleTitle}
                </div>
              </div>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left">
                    <a href="${articleUrl}" style="display: inline-block; background-color: #ffffff; color: #252525; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 6px;">Read Full Article →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #2b2b2b; border-top: 1px solid rgba(255,255,255,0.05); padding: 24px 40px; text-align: left;">
              <p style="margin: 0 0 6px 0; color: #707070; font-size: 12px; line-height: 1.4;">
                You are receiving this because you are an active subscriber to the Vipprow newsletter stream.
              </p>
              <p style="margin: 0; color: #707070; font-size: 12px;">&copy; ${new Date().getFullYear()} Vipprow. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// import { Resend } from "resend";

// /**
//  * Sends a newsletter confirmation email to a newly subscribed user.
//  * @param {Object} params
//  * @param {string} params.email
//  */
// export async function sendNewsletterSubscriptionEmail({ email }) {
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "Vipprow <noreply@mail.croissix.com>",
//       to: email,
//       subject: "You're in! Welcome to the Vipprow Newsletter 🚀",
//       html: buildNewsletterTemplate({ email }),
//     });

//     if (error) {
//       console.error("Resend error:", error);
//       return { success: false, error };
//     }

//     console.log("✅ Newsletter subscription email sent:", data?.id);
//     return { success: true, id: data?.id };
//   } catch (err) {
//     console.error("Email service error:", err.message);
//     return { success: false, error: err.message };
//   }
// }

// // ─── HTML Template ────────────────────────────────────────────────────────────
// function buildNewsletterTemplate({ email }) {
//   return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <title>Thanks for Subscribing</title>
// </head>
// <body style="margin:0; padding:0; background-color:#252525; font-family: 'Poppins', 'Inter', Helvetica, Arial, sans-serif;">

//   <!-- Main Container -->
//   <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#252525; padding: 40px 0;">
//     <tr>
//       <td align="center">
//         <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #353535; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">

//           <!-- ── Header Block ── -->
//           <tr>
//             <td style="padding: 40px 40px 20px 40px; text-align: left;">
//               <div style="margin-bottom: 24px;">
//                 <span style="color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
//                   VIPPROW
//                 </span>
//               </div>
//               <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; line-height: 1.3;">
//                 Thanks for subscribing!
//               </h1>
//             </td>
//           </tr>

//           <!-- ── Message Body ── -->
//           <tr>
//             <td style="padding: 0 40px 30px 40px;">
//               <p style="margin: 0 0 20px 0; color: #b5b5b5; font-size: 15px; line-height: 1.6;">
//                 You have successfully joined the Vipprow newsletter. From now on, you'll be the first to receive updates on our latest insights, platform features, and tech trends straight to your inbox.
//               </p>

//               <!-- Clean details row instead of heavy tables -->
//               <div style="background-color: #2b2b2b; border-radius: 8px; padding: 16px 20px; margin-bottom: 30px; border: 1px solid rgba(255,255,255,0.05); text-align: left;">
//                     <!-- Line 1: Label -->
//                     <div style="color: #858585; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
//                         Subscribed As
//                     </div>
//                     <!-- Line 2: Value -->
//                     <div style="color: #ffffff; font-size: 14px; font-weight: 500; word-break: break-all;">
//                         ${email}
//                     </div>
//               </div>

//               <!-- Functional Call to Action Button -->
//               <table width="100%" cellpadding="0" cellspacing="0">
//                 <tr>
//                   <td align="left">
//                     <a
//                       href="https://vipprow.com"
//                       style="
//                         display: inline-block;
//                         background-color: #ffffff;
//                         color: #252525;
//                         text-decoration: none;
//                          Sherwood;
//                         font-size: 14px;
//                         font-weight: 600;
//                         padding: 12px 28px;
//                         border-radius: 6px;
//                         transition: background 0.2s ease;
//                       "
//                     >
//                       Explore Our Platform →
//                     </a>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- ── Footer Block ── -->
//           <tr>
//             <td style="background-color: #2b2b2b; border-top: 1px solid rgba(255,255,255,0.05); padding: 24px 40px; text-align: left;">
//               <p style="margin: 0 0 6px 0; color: #707070; font-size: 12px; line-height: 1.4;">
//                 You received this email because you signed up for newsletter updates on the Vipprow website.

//               </p>
//               <p style="margin: 0; color: #707070; font-size: 12px;">
//                 © ${new Date().getFullYear()} Vipprow. All rights reserved.
//               </p>
//             </td>
//           </tr>

//         </table>
//       </td>
//     </tr>
//   </table>

// </body>
// </html>
//   `.trim();
// }

// // <div style="background-color: #2b2b2b; border-radius: 8px; padding: 16px 20px; margin-bottom: 30px; border: 1px solid rgba(255,255,255,0.05);">
// // <table width="100%" cellpadding="0" cellspacing="0">
// //   <tr>
// //     <td style="color: #858585; font-size: 13px; font-weight: 500; width: 30%;">Subscribed As:</td>
// //     <td style="color: #ffffff; font-size: 13px; font-weight: 500;">${email}</td>
// //   </tr>
// // </table>
// //   </div>
