export type ToolGuide = {
  seoTitle: string;
  metaDescription: string;
  steps: string[];
  example?: string;
  note?: string;
  faqs: { question: string; answer: string }[];
};

export const toolGuides: Record<string, ToolGuide> = {
  "pdf-merger": {
    seoTitle: "Merge PDF Files Free Without Uploading",
    metaDescription:
      "Combine up to 20 PDF files into one in your browser. Free, no sign up and no upload. Good for application documents, marksheets and certificates.",
    steps: [
      "Select at least two PDF files from your phone or computer.",
      "Check the file list, because the PDFs are joined in that order.",
      "Select Merge PDFs, then download the combined file.",
    ],
    example:
      "Applying online? Select your marksheet, ID proof and certificate in that order to get one PDF for a single upload box.",
    faqs: [
      {
        question: "How many PDFs can I merge?",
        answer:
          "Up to 20 files at once. Each file can be up to 25 MB, and all files together can be up to 100 MB.",
      },
      {
        question: "Are my documents uploaded?",
        answer:
          "No. The merge runs inside your browser, so your documents stay on your device.",
      },
      {
        question: "Why did my PDF fail to merge?",
        answer:
          "The file may be damaged or password protected. Remove the password in a PDF reader you trust, then try again.",
      },
    ],
  },
  "jpg-to-pdf": {
    seoTitle: "JPG to PDF Converter Free Without Uploading",
    metaDescription:
      "Turn JPG and PNG photos into one A4 PDF in your browser. Free, no sign up and no upload. Useful for scanned documents and assignments.",
    steps: [
      "Select your JPG or PNG images in the order you want the pages.",
      "Select Create PDF. Each image is placed on its own A4 page.",
      "Download the PDF and check every page before you submit it.",
    ],
    example:
      "Photographed a 3-page assignment on your phone? Select the three photos in order to get a single 3-page PDF.",
    faqs: [
      {
        question: "How many images can I add?",
        answer: "Up to 20 images, and each image can be up to 20 MB.",
      },
      {
        question: "Why is my PDF too large for a form?",
        answer:
          "A PDF is about as large as the images inside it. Make the images smaller with the Image Compressor first, then create the PDF again.",
      },
      {
        question: "Are my images uploaded?",
        answer: "No. The PDF is created in your browser, on your device.",
      },
    ],
  },
  "image-compressor": {
    seoTitle: "Compress Image Online Free – JPG, PNG, WebP",
    metaDescription:
      "Reduce JPG, PNG and WebP image size in your browser. Choose the quality, compare the size and download. Free with no upload.",
    steps: [
      "Choose a JPEG, PNG or WebP image up to 20 MB.",
      "Move the quality slider. Lower quality gives a smaller file.",
      "Select Compress image, check the new size and download it.",
    ],
    note: "PNG images are saved as WebP because that format is usually much smaller. Need a specific size such as 50 KB for a form? Use the Photo Resizer in KB.",
    faqs: [
      {
        question: "What quality should I choose?",
        answer:
          "Start at the default of 78%. Text and fine detail can start to look rough at lower settings, so check the result before you use it.",
      },
      {
        question: "Why did my image not get smaller?",
        answer:
          "It may already be compressed. Try a lower quality setting, or reduce its dimensions.",
      },
      {
        question: "Is my image uploaded?",
        answer: "No. Compression happens in your browser, on your device.",
      },
    ],
  },
  "form-ready-kit": {
    seoTitle: "Form Ready Kit – Photo, Signature and PDF",
    metaDescription:
      "Prepare your photo, signature and documents for exam and job forms in one place. Checks your KB limits. Free, in English and Hindi, with no upload.",
    steps: [
      "Open your official notification and note the limits it gives.",
      "Add your photo, signature and any document images, then enter the limits.",
      "Select Make my files ready, check each result, then download your files.",
    ],
    example:
      "Add one photo, one signature and three marksheet photos. You get photo.jpg, signature.jpg and documents.pdf, each marked as within or outside your limit.",
    note: "Limits differ between exams and can change every year. The starting values are only examples, so always follow your official notification.",
    faqs: [
      {
        question: "What makes this different from a normal image resizer?",
        answer:
          "It prepares all your files in one step and checks each one against the limits you enter, so you do not need a separate tool for each file.",
      },
      {
        question: "Is my data uploaded?",
        answer:
          "No. Your photo, signature and documents are processed in your browser and stay on your device.",
      },
      {
        question: "Is it available in Hindi?",
        answer: "Yes. Use the Hindi link on this page.",
      },
    ],
  },
  "pdf-compressor": {
    seoTitle: "PDF Size Reducer in KB – Free, No Upload",
    metaDescription:
      "Reduce a PDF to the KB size you need, such as 100 KB or 200 KB. Free, works in your browser, with no sign up and no upload.",
    steps: [
      "Choose a PDF up to 25 MB.",
      "Enter the target size in KB from your form.",
      "Select Reduce PDF size, check the result, then download it.",
    ],
    note: "To save space, pages are turned into images. Text in the new file cannot be selected, so keep your original PDF.",
    faqs: [
      {
        question: "Is my PDF uploaded?",
        answer: "No. It is processed in your browser, on your device.",
      },
      {
        question: "Why can’t my PDF reach my target?",
        answer:
          "Each page needs some space, so long documents may not fit. You get the smallest version the tool can make. Remove pages with the PDF Page Extractor, or use a higher target.",
      },
      {
        question: "Can it open password-protected PDFs?",
        answer: "No. Remove the password in a PDF reader you trust first.",
      },
    ],
  },
  "image-resizer": {
    seoTitle: "Image Resizer – Resize to Exact Pixels Online",
    metaDescription:
      "Resize JPG, PNG and WebP images to exact pixel dimensions in your browser. Keep the shape or set both sides. Free with no upload.",
    steps: [
      "Choose a JPEG, PNG or WebP image.",
      "Enter a width, a height, or both.",
      "Select Resize image and download the result.",
    ],
    note: "Enter only one side to keep the image’s shape. Entering both sides can stretch it. WebP images are saved as JPG.",
    faqs: [
      {
        question: "Can I make a small image larger?",
        answer:
          "Yes, but it will not gain detail, so it can look soft or blurry.",
      },
      {
        question: "Is my image uploaded?",
        answer: "No. Resizing happens on your device.",
      },
    ],
  },
  "jpg-to-png": {
    seoTitle: "JPG to PNG Converter Without Uploading",
    metaDescription:
      "Convert a JPG image to PNG in your browser. Free, with no sign up and no upload. Works on phones and computers.",
    steps: [
      "Choose a JPG image.",
      "Select Convert to PNG.",
      "Download the PNG file.",
    ],
    faqs: [
      {
        question: "Will PNG improve my photo’s quality?",
        answer:
          "No. PNG keeps the image as it is now, but it cannot restore detail already lost in the JPG.",
      },
      {
        question: "Why is the PNG larger?",
        answer: "PNG does not throw away detail, so photos are usually larger.",
      },
    ],
  },
  "png-to-jpg": {
    seoTitle: "PNG to JPG Converter Without Uploading",
    metaDescription:
      "Convert a PNG image to JPG in your browser, often with a much smaller file. Free, with no sign up and no upload.",
    steps: [
      "Choose a PNG image.",
      "Select Convert to JPG.",
      "Download the JPG file.",
    ],
    faqs: [
      {
        question: "What happens to transparent areas?",
        answer: "JPG has no transparency, so those areas become white.",
      },
      {
        question: "Is my image uploaded?",
        answer: "No. The conversion happens on your device.",
      },
    ],
  },
  "pdf-page-extractor": {
    seoTitle: "Extract Pages From a PDF Without Uploading",
    metaDescription:
      "Save only the pages you need from a PDF into a new file. Enter pages like 1-3, 5. Free, in your browser, with no upload.",
    steps: [
      "Choose a PDF file up to 25 MB.",
      "Enter the pages to keep, such as 1-3, 5.",
      "Select Extract pages and download the new PDF.",
    ],
    faqs: [
      {
        question: "Does this change my original PDF?",
        answer: "No. It creates a new file and leaves the original as it is.",
      },
      {
        question: "Can it open password-protected PDFs?",
        answer: "No. Remove the password in a PDF reader you trust first.",
      },
    ],
  },
  "photo-signature-resizer": {
    seoTitle: "Photo Resizer in KB – Photo and Signature",
    metaDescription:
      "Resize a photo or signature to the KB limit and pixel size your online form asks for. Set your own limits. Free, in your browser, with no upload.",
    steps: [
      "Open your exam or job notification and note the size limits it gives.",
      "Choose Photo or Signature, then change the KB and pixel values to match.",
      "Select Resize image, check the result, then download the JPG.",
    ],
    example:
      "If a form asks for a photo of 20 KB to 50 KB at 200 × 230 pixels, enter those four values. The tool crops the centre to fit and finds a quality that stays under 50 KB.",
    note: "Limits differ between exams and can change every year. The starting values here are only examples, so always follow your official notification.",
    faqs: [
      {
        question: "Why does the form reject my photo?",
        answer:
          "Forms usually check the file type, KB size and sometimes the pixel size. Make sure all of them match the notification. This tool always creates a JPG file.",
      },
      {
        question: "What if the result is below the minimum KB?",
        answer:
          "The tool tells you. Try a larger pixel size or a clearer original photo, because more detail makes a larger file.",
      },
      {
        question: "Is my photo or signature uploaded?",
        answer:
          "No. Your photo and signature are processed in your browser and stay on your device.",
      },
    ],
  },
  "word-counter": {
    seoTitle: "Word Counter – Count Words and Characters Online",
    metaDescription:
      "Count words, characters, sentences and reading time as you type. Free online word counter for essays, assignments and posts.",
    steps: [
      "Type or paste your text into the box.",
      "Read the live counts as you edit.",
      "Trim or expand your text until it fits your limit.",
    ],
    faqs: [
      {
        question: "How is reading time calculated?",
        answer:
          "It assumes a reading speed of 200 words per minute and rounds up to the next minute.",
      },
      {
        question: "Is my text saved?",
        answer: "No. Counting happens in your browser and nothing is uploaded.",
      },
    ],
  },
  "case-converter": {
    seoTitle: "Case Converter – Uppercase, Lowercase, Title Case",
    metaDescription:
      "Change text to uppercase, lowercase, title case or sentence case in one click. Free, private and works on your phone.",
    steps: [
      "Paste your text into the box.",
      "Choose upper, lower, title or sentence case.",
      "Copy the result from the output box.",
    ],
    example:
      "“hello WORLD” becomes “HELLO WORLD” in upper case and “Hello World” in title case.",
    faqs: [
      {
        question: "What is the difference between title and sentence case?",
        answer:
          "Title case capitalises the first letter of every word. Sentence case capitalises only the first letter of each sentence.",
      },
      {
        question: "Why did sentence case keep some capital letters?",
        answer:
          "Sentence case only adds capitals and keeps your other letters as they are. Convert to lower case first if your text is all capitals.",
      },
    ],
  },
  "remove-duplicate-lines": {
    seoTitle: "Remove Duplicate Lines From Text Online",
    metaDescription:
      "Paste a list and remove repeated lines instantly. The first copy of each line stays in its original order. Free and private.",
    steps: [
      "Paste your list with one item on each line.",
      "The result updates automatically.",
      "Copy your cleaned list.",
    ],
    example: "“apple, mango, apple” on three lines becomes “apple, mango”.",
    faqs: [
      {
        question: "Does it change the order?",
        answer: "No. The first copy of each line stays where it was.",
      },
      {
        question: "Is it case sensitive?",
        answer:
          "Yes. “Apple” and “apple” count as different lines. Lines with different spaces also count as different, so use the Whitespace Cleaner first if needed.",
      },
    ],
  },
  "text-sorter": {
    seoTitle: "Sort Text Lines Alphabetically Online",
    metaDescription:
      "Sort a list of lines into A to Z order in your browser. Free online text sorter for names, lists and notes.",
    steps: [
      "Paste your list with one item on each line.",
      "The lines are sorted A to Z automatically.",
      "Copy the sorted list.",
    ],
    faqs: [
      {
        question: "Can it sort a class list of names?",
        answer:
          "Yes. Put each name on its own line and they will be sorted alphabetically.",
      },
      {
        question: "Is my text uploaded?",
        answer: "No. Sorting happens on your device.",
      },
    ],
  },
  "find-replace-text": {
    seoTitle: "Find and Replace Text Online",
    metaDescription:
      "Replace every match of a word or phrase in a block of text at once. Free, private and easy to use on your phone.",
    steps: [
      "Paste your text into the box.",
      "Enter the word to find and the replacement.",
      "Copy the updated text from the result.",
    ],
    faqs: [
      {
        question: "Is the search case sensitive?",
        answer:
          "Yes. Searching for “cat” does not change “Cat”. It also matches inside longer words, so “cat” matches part of “category”.",
      },
      {
        question: "How do I delete a word?",
        answer: "Leave “Replace with” empty and every match will be removed.",
      },
    ],
  },
  "whitespace-cleaner": {
    seoTitle: "Remove Extra Spaces and Blank Lines Online",
    metaDescription:
      "Clean text pasted from PDFs and websites. Removes extra spaces, tabs and blank lines instantly. Free and private.",
    steps: [
      "Paste your untidy text.",
      "Extra spaces, tabs and blank lines are removed automatically.",
      "Copy the clean text.",
    ],
    faqs: [
      {
        question: "What exactly does it remove?",
        answer:
          "Spaces at the start and end of each line, repeated spaces or tabs inside a line, and empty lines.",
      },
      {
        question: "Does it join my lines together?",
        answer: "No. Each line that contains text stays on its own line.",
      },
    ],
  },
  "line-counter": {
    seoTitle: "Line Counter – Count Lines of Text Online",
    metaDescription:
      "Count the lines and characters in any text as you type. Free online line counter for lists, code and notes.",
    steps: [
      "Paste or type your text.",
      "Read the line and character count in the result.",
      "Copy the count if you need it.",
    ],
    faqs: [
      {
        question: "Are blank lines counted?",
        answer: "Yes. Every line counts, including blank ones.",
      },
      {
        question: "Are spaces counted as characters?",
        answer: "Yes. Spaces and line breaks are included.",
      },
    ],
  },
  "url-encoder-decoder": {
    seoTitle: "URL Encoder and Decoder Online",
    metaDescription:
      "Encode or decode URL text instantly in your browser. Handy for query parameters and special characters. Free and private.",
    steps: [
      "Paste your text or encoded URL.",
      "Choose encode or decode.",
      "Copy the result.",
    ],
    example: "“a b&c” encodes to “a%20b%26c”.",
    faqs: [
      {
        question: "When should I encode text?",
        answer:
          "Encode a value before you place it in a URL query, so spaces and symbols such as & do not break the link.",
      },
      {
        question: "Why do I get an invalid text error?",
        answer:
          "The input contains a broken percent sequence, such as a % that is not followed by two valid characters.",
      },
    ],
  },
  "json-formatter": {
    seoTitle: "JSON Formatter and Validator Online",
    metaDescription:
      "Format, minify and validate JSON in your browser. Your data is not sent anywhere. Free tool for developers and students.",
    steps: [
      "Paste your JSON into the box.",
      "Select Format to make it readable, or Minify to make it compact.",
      "Fix any error shown, then copy the result.",
    ],
    faqs: [
      {
        question: "Is my JSON sent to a server?",
        answer:
          "No. It is checked in your browser, so it is safer for private data than tools that upload it.",
      },
      {
        question: "Why is my JSON invalid?",
        answer:
          "Common causes are trailing commas, single quotes and keys without double quotes.",
      },
    ],
  },
  "qr-generator": {
    seoTitle: "Free QR Code Generator – Download as PNG",
    metaDescription:
      "Create a QR code for any link or text and download it as a PNG. Free, with no sign up, and made in your browser.",
    steps: [
      "Enter a link or text.",
      "Choose the image size and error correction level.",
      "Generate the QR code, test it with your phone, then download it.",
    ],
    faqs: [
      {
        question: "Do these QR codes expire?",
        answer:
          "No. The content is stored inside the code itself, so it keeps working. If it holds a link, that website must stay online.",
      },
      {
        question: "What size should I use for printing?",
        answer:
          "Choose the largest size, 512 pixels, and test the printed code with your phone before printing many copies.",
      },
    ],
  },
  "base64-encoder-decoder": {
    seoTitle: "Base64 Encoder and Decoder Online",
    metaDescription:
      "Encode text to Base64 or decode it back in your browser. Supports Hindi and other Unicode text. Free and private.",
    steps: [
      "Paste your text or Base64 value.",
      "Choose encode or decode.",
      "Copy the result.",
    ],
    example: "“Hello” encodes to “SGVsbG8=”.",
    faqs: [
      {
        question: "Is Base64 encryption?",
        answer:
          "No. Anyone can decode it, so never use Base64 to protect a password or private data.",
      },
      {
        question: "Does it work with Hindi text?",
        answer: "Yes. Text is treated as UTF-8, so Hindi works correctly.",
      },
    ],
  },
  "password-generator": {
    seoTitle: "Strong Password Generator Online",
    metaDescription:
      "Generate a strong random password of 8 to 64 characters on your own device. Nothing is sent or saved. Free and private.",
    steps: [
      "Enter a length from 8 to 64. The default is 16.",
      "Select Generate.",
      "Copy the password into a password manager.",
    ],
    faqs: [
      {
        question: "Is this password safe to use?",
        answer:
          "It is made on your device with your browser’s secure random number generator, and it is not sent or saved anywhere.",
      },
      {
        question: "Why are some letters missing?",
        answer:
          "Characters that look alike, such as I, l, O, 0 and 1, are left out to avoid typing mistakes.",
      },
    ],
  },
  "uuid-generator": {
    seoTitle: "UUID Generator – Random UUID v4 Online",
    metaDescription:
      "Generate a random version 4 UUID in your browser with one click. Free tool for developers and testing.",
    steps: [
      "Select Generate.",
      "Copy the UUID.",
      "Generate again for another.",
    ],
    faqs: [
      {
        question: "What type of UUID is this?",
        answer:
          "A random version 4 UUID, created by your browser’s built-in secure generator.",
      },
      {
        question: "Can two UUIDs be the same?",
        answer:
          "It is extremely unlikely, so random UUIDs are widely used as unique IDs.",
      },
    ],
  },
  "age-calculator": {
    seoTitle: "Age Calculator as on Date – Years, Months, Days",
    metaDescription:
      "Calculate your exact age in years, months and days on any date. Useful for checking age limits on exam and job forms. Free.",
    steps: [
      "Enter your date of birth.",
      "Enter the date to calculate on. Leave it empty to use today.",
      "Read your age in years, months and days.",
    ],
    example:
      "Someone born on 15 August 2005 is 21 years, 2 months and 15 days old on 30 October 2026.",
    faqs: [
      {
        question: "How do I check an age limit for an exam?",
        answer:
          "Enter the cut-off date from the official notification in the second box, then compare the result with the limit given there.",
      },
      {
        question: "Can I calculate age on a past or future date?",
        answer: "Yes, as long as that date is on or after the date of birth.",
      },
    ],
  },
  "bmi-calculator": {
    seoTitle: "BMI Calculator in kg and cm",
    metaDescription:
      "Calculate your body mass index from weight in kg and height in cm, and see which range it falls in. Free and private.",
    steps: [
      "Enter your weight in kilograms.",
      "Enter your height in centimetres.",
      "Read your BMI and its range.",
    ],
    example: "A person of 65 kg and 170 cm has a BMI of 22.5.",
    note: "BMI is a screening number for adults, not a diagnosis. It does not measure muscle or body fat, so ask a doctor about your health.",
    faqs: [
      {
        question: "How is BMI calculated?",
        answer: "BMI is weight in kg divided by height in metres squared.",
      },
      {
        question: "What ranges does this tool use?",
        answer:
          "Below 18.5 is underweight, 18.5 to below 25 is the healthy range, 25 to below 30 is overweight, and 30 or more is the obesity range.",
      },
    ],
  },
  "percentage-calculator": {
    seoTitle: "Percentage Calculator – Marks and Numbers",
    metaDescription:
      "Find what percentage one number is of another. Enter marks obtained and total marks to get your percentage. Free and instant.",
    steps: [
      "Enter the part, such as your marks obtained.",
      "Enter the total, such as maximum marks.",
      "Read the percentage.",
    ],
    example: "45 marks out of 60 is 75%.",
    faqs: [
      {
        question: "What is the percentage formula?",
        answer: "Percentage = (part ÷ total) × 100.",
      },
      {
        question: "How do I find my overall percentage?",
        answer:
          "Add your marks from all subjects as the part, and add the maximum marks of all subjects as the total.",
      },
    ],
  },
  "discount-calculator": {
    seoTitle: "Discount Calculator – Sale Price in Rupees",
    metaDescription:
      "Enter a price and discount percentage to see the final price and how much you save in rupees. Free and instant.",
    steps: [
      "Enter the original price.",
      "Enter the discount percentage.",
      "Read the final price and your saving.",
    ],
    example: "₹2,499 at 30% off costs ₹1,749.30, so you save ₹749.70.",
    faqs: [
      {
        question: "What is the discount formula?",
        answer:
          "Saving = price × discount ÷ 100. Final price = price − saving.",
      },
      {
        question: "Does this include GST?",
        answer:
          "It works on the price you enter. Check whether that price already includes GST.",
      },
    ],
  },
  "gst-calculator": {
    seoTitle: "GST Calculator with CGST and SGST",
    metaDescription:
      "Add or remove GST at any rate and see the CGST and SGST split in rupees. Free GST calculator for India.",
    steps: [
      "Enter the amount and the GST rate.",
      "Choose exclusive if GST is not in the amount, or inclusive if it is.",
      "Read the GST and the total.",
    ],
    example:
      "Exclusive: ₹1,000 at 18% gives ₹180 GST and a ₹1,180 total. Inclusive: ₹1,180 at 18% contains ₹180 GST.",
    note: "Check the correct rate for your item on the official GST portal, because rates can change.",
    faqs: [
      {
        question: "How do I remove GST from a price?",
        answer:
          "Choose inclusive. The formula is GST = amount − amount ÷ (1 + rate ÷ 100).",
      },
      {
        question: "How is GST split into CGST and SGST?",
        answer:
          "For a sale within one state, total GST is normally divided equally. So ₹180 GST becomes ₹90 CGST and ₹90 SGST. A sale between states normally uses IGST instead.",
      },
    ],
  },
  "emi-calculator": {
    seoTitle: "EMI Calculator for Home, Car and Personal Loans",
    metaDescription:
      "Estimate your monthly loan EMI from the loan amount, annual interest rate and tenure in months. Free calculator in rupees.",
    steps: [
      "Enter the loan amount.",
      "Enter the annual interest rate.",
      "Enter the tenure in months, then read your EMI.",
    ],
    example: "₹5,00,000 at 9% a year for 60 months is about ₹10,379 a month.",
    note: "This is an estimate. Your lender’s rate, processing fees and charges may change the actual amount.",
    faqs: [
      {
        question: "What is the EMI formula?",
        answer:
          "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the loan, r is the monthly rate and n is the number of months.",
      },
      {
        question: "How do I enter tenure in years?",
        answer: "Multiply by 12, so 5 years is 60 months.",
      },
    ],
  },
  "sip-calculator": {
    seoTitle: "SIP Calculator – Estimate Mutual Fund Returns",
    metaDescription:
      "Estimate the future value of a monthly SIP from your investment, expected return and years. Free calculator in rupees.",
    steps: [
      "Enter your monthly investment.",
      "Enter the annual return you expect.",
      "Enter the years, then compare the value with the amount invested.",
    ],
    example:
      "₹5,000 a month for 10 years at an assumed 12% a year is about ₹11.6 lakh, on ₹6 lakh invested.",
    note: "This is an estimate, not a promise or investment advice. Mutual fund returns are not guaranteed and can be negative.",
    faqs: [
      {
        question: "How is the SIP value calculated?",
        answer:
          "Each monthly payment is assumed to be invested at the start of the month and to grow at the same monthly rate until the end.",
      },
      {
        question: "Does it include tax or fund charges?",
        answer: "No. Actual returns after tax and charges will be different.",
      },
    ],
  },
  "date-difference-calculator": {
    seoTitle: "Date Difference Calculator – Days Between Dates",
    metaDescription:
      "Count the number of days between any two dates. Useful for deadlines, notice periods and exam countdowns. Free and instant.",
    steps: [
      "Choose the start date.",
      "Choose the end date.",
      "Read the number of days between them.",
    ],
    example: "1 January 2026 to 30 October 2026 is 302 days.",
    faqs: [
      {
        question: "Is the end date included?",
        answer:
          "No. It counts the days between the dates, so add 1 if you want to include both.",
      },
      {
        question: "Does the order of dates matter?",
        answer: "No. You get the same number of days either way.",
      },
    ],
  },
  "unit-converter": {
    seoTitle: "Length Converter – km, m, cm, ft, inch, mile",
    metaDescription:
      "Convert length between kilometres, metres, centimetres, millimetres, miles, yards, feet and inches. Free and instant.",
    steps: [
      "Enter a value.",
      "Choose the unit to convert from, then the unit to convert to.",
      "Read the converted length.",
    ],
    example: "5 km is 5,000 m, and 6 ft is 1.83 m.",
    faqs: [
      {
        question: "How many centimetres are in a foot?",
        answer: "One foot is exactly 30.48 cm.",
      },
      {
        question: "How many metres are in a mile?",
        answer: "One mile is exactly 1,609.344 metres.",
      },
    ],
  },
  "fuel-cost-calculator": {
    seoTitle: "Fuel Cost Calculator – Trip Cost in Rupees",
    metaDescription:
      "Estimate petrol or diesel cost for a trip from distance, mileage and fuel price. Free calculator in rupees for car and bike trips.",
    steps: [
      "Enter the trip distance in km.",
      "Enter your vehicle’s mileage in km per litre.",
      "Enter the fuel price per litre, then read the cost.",
    ],
    example: "350 km at 18 km/l with fuel at ₹100 a litre costs ₹1,944.44.",
    note: "Real mileage changes with traffic, load and speed, so treat this as an estimate.",
    faqs: [
      {
        question: "What is the formula?",
        answer: "Fuel cost = (distance ÷ mileage) × fuel price.",
      },
      {
        question: "How do I work out a return trip?",
        answer: "Double the one-way distance before you enter it.",
      },
    ],
  },
};
