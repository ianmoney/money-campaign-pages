# Health insurance asset manifest

All runtime assets are local under `public/assets/health-insurance/`. Provider and testimonial files retain the authorised appearance and aspect ratios served on `money.com.au/health-quote-quick` on 2026-09-02.

| Local file | Approved source |
| --- | --- |
| `brand/money-logo-indigo.svg` | `https://www.money.com.au/logo-primary-long-indigo.svg` |
| `brand/money-logo-white.svg` | `https://www.money.com.au/logo-primary-long-white.svg` |
| `brand/money-m-background.svg` | Local copy of the approved M-only decorative background used by Money.com.au's health insurance page (`/images/dsl/LogoMoney-dark.svg`); the supplied `money vector.svg` wordmark is not used so the background contains no text. |
| `fonts/messina-sans-regular.woff2` | Money.com.au Next static media |
| `fonts/messina-sans-semibold.woff2` | Money.com.au Next static media |
| `fonts/messina-sans-black.woff2` | Money.com.au Next static media |
| `fonts/messina-sans-condensed-black.woff2` | Money.com.au Next static media |
| `providers/ahm.webp` | Money.com.au Storyblok asset for ahm |
| `providers/australian-seniors.webp` | Money.com.au Storyblok asset for Australian Seniors |
| `providers/australian-unity.webp` | Money.com.au Storyblok asset for Australian Unity |
| `providers/bupa.webp` | Money.com.au Storyblok asset for Bupa |
| `providers/hbf.webp` | Money.com.au Storyblok asset for HBF |
| `providers/hcf.webp` | Money.com.au Storyblok asset for HCF |
| `providers/hif.webp` | Money.com.au Storyblok asset for HIF |
| `providers/hunter-health-insurance.webp` | Money.com.au Storyblok asset for Hunter Health Insurance |
| `providers/nib.webp` | Money.com.au Storyblok asset for nib |
| `providers/real-insurance.webp` | Money.com.au Storyblok asset for Real Insurance |
| `providers/see-u-by-hbf.webp` | Money.com.au Storyblok asset for see-u by HBF |
| `people/chris.webp` | Money.com.au Storyblok Chris case-study image |
| `people/health-experts-ribbon.png` | 214×90 high-resolution crop supplied as the expert portrait reference |
| `brand/money-logo-footer.png` | Exact crop of the approved white footer lockup in the supplied mockup |

The three-person expert cluster is not available as a standalone current live-page asset. It is represented by the supplied 252×112 portrait reference, cropped to 214×90 and rendered at 107×45 for a sharper 2× source; no person was invented or altered. The footer lockup is stored as a dedicated 126×28 crop, avoiding runtime decoding of the full 1117×2048 reference image.
