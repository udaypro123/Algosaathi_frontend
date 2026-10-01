import { Box, Link, Typography } from "@mui/material";

const policySections = [
  {
    title: "Information we collect",
    paragraphs: [
      "When you create or use an AlgoSaathi account, we may process your name, email address, phone number, password, profile photo, account role, and the information you choose to add to your profile or submit through the service.",
      "If you sign in with Google, we receive the account details Google shares with us, such as your name, email address, and profile photo. We use these details to create or access your AlgoSaathi account.",
       "If you send us a query through the contact or learning enquiry form, we collect the details you submit, including your name, mobile number, school name, email address, education level, and message. We use this information to respond to your enquiry.",
       "When you use the website or mobile app, our systems and service providers may process technical information such as your IP address, device or browser details, request timestamps, authentication/session tokens, and diagnostic or security logs. Account security records can include login timestamps, verification or password-reset information, and failed-login attempts.",
      "If you upload an image, we process the image and related file information to provide the requested profile or platform feature.",
    ],
  },
   {
     title: "Cookies, local storage, and preferences",
     paragraphs: [
       "The website stores an authentication token and basic account information in your browser's local storage to keep you signed in. It also stores your selected display mode and background preference. A short-lived session storage value may be used to prevent repeated page reloads after a chunk-loading error. Clearing browser storage may sign you out or reset these preferences.",
       "The service may also use essential server-side cookies for authentication where enabled. We do not currently describe these technologies as advertising or cross-site tracking cookies.",
     ],
   },
  {
    title: "How we use information",
    paragraphs: [
      "We use information to create and manage accounts, authenticate users, provide learning and platform features, display profiles and uploaded content, send verification or account-related emails, respond to support requests, protect the service, and diagnose technical problems.",
      "We do not sell personal information. We do not use account information for targeted advertising.",
    ],
  },
  {
    title: "When information is shared",
    paragraphs: [
       "We share information only as needed to operate AlgoSaathi, protect users, or meet legal obligations. This can include database and hosting providers; Google when you choose Google sign-in; Cloudinary when an image is uploaded; and the email provider configured to deliver account messages. These providers process information under their own privacy terms and service arrangements. The providers used can depend on the service configuration and where the service is hosted.",
      "We may also disclose information when required by law or when reasonably necessary to protect the rights, safety, and security of AlgoSaathi, our users, or others. We do not sell or rent personal information to third parties.",
    ],
  },
  {
    title: "Storage and security",
    paragraphs: [
      "Account information is stored in the service's database. Passwords are hashed before storage; authentication tokens are used to provide secure access. Uploaded images may be stored by our image-hosting provider.",
      "We use reasonable technical and organizational measures to protect information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Retention and deletion",
    paragraphs: [
      "We keep information for as long as needed to provide the service, maintain account records, resolve disputes, enforce our agreements, and meet legal obligations. Retention periods can vary depending on the type of information and why it is held.",
      "You can request access to, correction of, or deletion of your personal information by emailing us from the address associated with your account. We may ask you to verify your identity before handling a request. Some information may need to be retained where the law requires it or for legitimate security and record-keeping purposes.",
       "Account deletion is currently handled by request to our support email; the app does not provide a self-service account deletion control. A deletion request may require us to deactivate the account and remove or de-identify associated information, subject to legal, security, and operational retention requirements. Copies held in backups may remain until those backups are replaced in the ordinary course.",
    ],
  },
  {
    title: "Your choices",
    paragraphs: [
      "You can choose not to provide optional profile information. Some account details are required to register or use particular features. You can stop using the service at any time and contact us to request account deletion or exercise privacy rights available in your location.",
      "If you use Google sign-in, you can manage AlgoSaathi's access through your Google Account settings. This does not by itself delete your AlgoSaathi account; contact us to request that separately.",
       "Depending on where you live, applicable privacy law may give you additional rights, such as requesting a copy of your information, correcting it, objecting to or restricting certain processing, or asking for data portability. Contact us and tell us your country or region so we can review your request under the applicable law.",
    ],
  },
  {
    title: "Children's privacy",
    paragraphs: [
      "AlgoSaathi is not intended for children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, please contact us so we can review and take appropriate steps.",
    ],
  },
  {
    title: "Third-party services and links",
    paragraphs: [
       "The service may rely on third-party platforms or link to external websites, including Google sign-in, Cloudinary image hosting, database/hosting providers, and email delivery providers. The service may also use Google's Gemini service to generate platform learning or news content. We do not intentionally send account profile details to Gemini for that content-generation feature. Third parties' privacy practices are governed by their own policies, and we encourage you to review those policies when using their services.",
    ],
  },
   {
     title: "International processing",
     paragraphs: [
       "AlgoSaathi and its service providers may process or store information in countries other than the one where you live. Privacy protections and government access rules can differ between countries. Where required, we will use appropriate safeguards for international transfers.",
     ],
   },
  {
    title: "Changes and contact",
    paragraphs: [
      "We may update this policy when the service or our practices change. The latest version will be available at this URL with its updated date. Continued use after an update means the revised policy applies to your use of the service, subject to applicable law.",
    ],
  },
];

const PrivacyPolicy = () => (
  <Box
    component="main"
    sx={{
      minHeight: "70vh",
      pt: { xs: 13, sm: 15 },
      pb: { xs: 7, md: 10 },
      px: { xs: 2.5, sm: 4 },
      bgcolor: "#f7f8f5",
      color: "#202923",
    }}
  >
    <Box component="article" sx={{ maxWidth: 820, mx: "auto" }}>
      <Box
        component="header"
        sx={{ pb: { xs: 3, md: 4 }, mb: 4, borderBottom: "1px solid #dce2db" }}
      >
        <Typography
          component="p"
          sx={{ color: "#b94c25", fontSize: 13, fontWeight: 700, mb: 1.5 }}
        >
          ALGOSAATHI · PRIVACY
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: { xs: 38, sm: 52 },
            lineHeight: 1.08,
            fontWeight: 500,
            mb: 2,
          }}
        >
          Privacy Policy
        </Typography>
        <Typography sx={{ color: "#58645c", fontSize: 15, lineHeight: 1.7 }}>
          Effective date: October 1, 2026
        </Typography>
        <Typography sx={{ color: "#58645c", fontSize: 15, lineHeight: 1.7, mt: 1 }}>
          AlgoSaathi is operated by Uday Chauhan. This policy applies to algosaathi.com
          and the AlgoSaathi mobile app. It explains what information we handle and the
          choices you have.
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gap: { xs: 3.5, md: 4 } }}>
        {policySections.map((section, index) => (
          <Box component="section" key={section.title}>
            <Typography
              component="h2"
              sx={{ fontSize: 20, fontWeight: 700, mb: 1.25, color: "#263d31" }}
            >
              <Box component="span" sx={{ color: "#b94c25", mr: 1.25, fontSize: 13 }}>
                {String(index + 1).padStart(2, "0")}
              </Box>
              {section.title}
            </Typography>
            {section.paragraphs.map((paragraph) => (
              <Typography
                component="p"
                key={paragraph}
                sx={{ color: "#46524a", fontSize: 15, lineHeight: 1.8, mb: 1.25 }}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>
        ))}

        <Box
          component="section"
          sx={{ mt: 1, p: { xs: 2.5, sm: 3 }, bgcolor: "#e9eee8", borderLeft: "3px solid #b94c25" }}
        >
          <Typography component="h2" sx={{ fontSize: 20, fontWeight: 700, mb: 1 }}>
            Contact us
          </Typography>
          <Typography sx={{ color: "#46524a", fontSize: 15, lineHeight: 1.8 }}>
            For privacy questions or to request access, correction, or deletion, email us
            from the address associated with your account. For account deletion, use the
            subject line "Account deletion request" and include your account email. We may
            ask you to verify your identity before processing the request. Email{" "}
            <Link
              href="mailto:chauhanuday842@gmail.com?subject=Account%20deletion%20request"
              sx={{ color: "#98401f", fontWeight: 700 }}
            >
              chauhanuday842@gmail.com
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default PrivacyPolicy;