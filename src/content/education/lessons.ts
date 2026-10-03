import type { ChapterLesson } from "@/types/education";

export const chapterLessons: ChapterLesson[] = [
  {
    id: "class-9-number-system-en",
    chapterId: "class-9-math-number-system",
    locale: "en",
    title: "Number System Explained Simply",
    description:
      "Understand rational and irrational numbers, decimal expansions and the number line with simple examples.",
    status: "published",
    searchIntent:
      "Learn Class 9 number system concepts in easy English with original questions and answers.",
    prerequisites: [
      "Whole numbers and integers",
      "Fractions and decimals",
      "Basic square roots",
    ],
    learningObjectives: [
      "Classify common types of numbers",
      "Place rational numbers on a number line",
      "Recognise rational and irrational decimal expansions",
      "Find rational numbers between two given numbers",
    ],
    sections: [
      {
        heading: "The number families",
        paragraphs: [
          "Numbers are organised in nested families. Natural numbers are used for counting. Adding zero gives whole numbers, and adding negative whole numbers gives integers.",
          "A rational number can be written as p/q, where p and q are integers and q is not zero. Every integer is rational because, for example, 5 can be written as 5/1.",
        ],
        example: {
          label: "Classification example",
          problem: "Classify −4, 0, 3/5 and √2.",
          solution:
            "−4 is an integer and rational number; 0 is whole, integer and rational; 3/5 is rational; √2 is irrational.",
        },
      },
      {
        heading: "Rational and irrational decimals",
        paragraphs: [
          "A rational number has a decimal expansion that either ends or repeats a fixed pattern. For example, 3/8 = 0.375 ends, while 1/3 = 0.333… repeats.",
          "An irrational number has a decimal expansion that neither ends nor repeats. Numbers such as √2 and √3 are irrational. Rational and irrational numbers together form the real numbers.",
        ],
        example: {
          label: "Decimal example",
          problem: "Is 0.272727… rational?",
          solution: "Yes. The block 27 repeats, so the number is rational.",
        },
      },
      {
        heading: "Finding numbers between numbers",
        paragraphs: [
          "There are infinitely many rational numbers between any two different rational numbers. One quick method is to take their average. You can repeat the method to find more numbers.",
          "To compare or place numbers on a number line, write them in a common form such as fractions with the same denominator or decimals of sufficient accuracy.",
        ],
        example: {
          label: "Between two fractions",
          problem: "Find one rational number between 1/3 and 1/2.",
          solution:
            "Their average is (1/3 + 1/2) ÷ 2 = 5/12. Therefore 5/12 lies between them.",
        },
      },
    ],
    keyTerms: [
      {
        term: "Rational number",
        meaning: "A number expressible as p/q with integers p and q and q ≠ 0.",
      },
      {
        term: "Irrational number",
        meaning:
          "A real number whose decimal expansion is non-terminating and non-repeating.",
      },
      {
        term: "Real number",
        meaning:
          "Any rational or irrational number represented on the number line.",
      },
    ],
    commonMistakes: [
      "Assuming every non-terminating decimal is irrational; repeating decimals are rational.",
      "Using zero as the denominator of a fraction.",
      "Thinking there is only one rational number between two rational numbers.",
    ],
    revisionPoints: [
      "Natural ⊂ Whole ⊂ Integers ⊂ Rational ⊂ Real.",
      "Terminating or repeating decimal means rational.",
      "Non-terminating and non-repeating decimal means irrational.",
    ],
    questions: [
      {
        question: "Is −7 a rational number?",
        answer: "Yes, because −7 = −7/1.",
        difficulty: "basic",
      },
      {
        question: "Write one rational number between 2/5 and 3/5.",
        answer: "1/2",
        explanation: "The average is (2/5 + 3/5) ÷ 2 = 1/2.",
        difficulty: "standard",
      },
      {
        question: "Why is 0.1010010001… irrational?",
        answer: "Its decimal neither terminates nor repeats a fixed block.",
        difficulty: "challenge",
      },
    ],
    reviewedAt: "2026-10-04",
    updatedAt: "2026-10-04",
  },
  {
    id: "class-9-number-system-hi",
    chapterId: "class-9-math-number-system",
    locale: "hi",
    title: "संख्या पद्धति आसान भाषा में",
    description:
      "परिमेय और अपरिमेय संख्याएँ, दशमलव प्रसार और संख्या रेखा को सरल उदाहरणों से समझें।",
    status: "published",
    searchIntent:
      "कक्षा 9 संख्या पद्धति को आसान हिंदी में मौलिक प्रश्न-उत्तर के साथ समझना।",
    prerequisites: [
      "पूर्ण संख्याएँ और पूर्णांक",
      "भिन्न और दशमलव",
      "वर्गमूल की बुनियादी समझ",
    ],
    learningObjectives: [
      "संख्याओं के प्रमुख प्रकार पहचानना",
      "परिमेय संख्या को संख्या रेखा पर दिखाना",
      "परिमेय और अपरिमेय दशमलव पहचानना",
      "दो संख्याओं के बीच परिमेय संख्या खोजना",
    ],
    sections: [
      {
        heading: "संख्याओं के परिवार",
        paragraphs: [
          "गिनती के लिए 1, 2, 3 जैसी प्राकृतिक संख्याएँ उपयोग होती हैं। इनमें शून्य जोड़ने पर पूर्ण संख्याएँ और ऋणात्मक संख्याएँ जोड़ने पर पूर्णांक मिलते हैं।",
          "जिस संख्या को p/q के रूप में लिखा जा सके, जहाँ p और q पूर्णांक हों और q शून्य न हो, वह परिमेय संख्या है। इसलिए हर पूर्णांक परिमेय भी होता है।",
        ],
        example: {
          label: "पहचान का उदाहरण",
          problem: "−4, 0, 3/5 और √2 को पहचानिए।",
          solution:
            "−4 पूर्णांक और परिमेय है; 0 पूर्ण संख्या, पूर्णांक और परिमेय है; 3/5 परिमेय है; √2 अपरिमेय है।",
        },
      },
      {
        heading: "परिमेय और अपरिमेय दशमलव",
        paragraphs: [
          "परिमेय संख्या का दशमलव या तो समाप्त हो जाता है या एक निश्चित समूह को दोहराता है। जैसे 3/8 = 0.375 समाप्त होता है और 1/3 = 0.333… दोहराता है।",
          "अपरिमेय संख्या का दशमलव न समाप्त होता है, न किसी निश्चित समूह को दोहराता है। √2 और √3 इसके उदाहरण हैं। परिमेय और अपरिमेय संख्याएँ मिलकर वास्तविक संख्याएँ बनाती हैं।",
        ],
        example: {
          label: "दशमलव उदाहरण",
          problem: "क्या 0.272727… परिमेय है?",
          solution: "हाँ। इसमें 27 का समूह बार-बार आता है, इसलिए यह परिमेय है।",
        },
      },
      {
        heading: "दो संख्याओं के बीच संख्या खोजना",
        paragraphs: [
          "किन्हीं दो अलग परिमेय संख्याओं के बीच अनंत परिमेय संख्याएँ होती हैं। एक संख्या पाने के लिए दोनों का औसत निकाल सकते हैं।",
          "संख्या रेखा पर रखने या तुलना करने के लिए संख्याओं को समान हर वाले भिन्न या पर्याप्त दशमलव अंकों में बदलना उपयोगी होता है।",
        ],
        example: {
          label: "भिन्नों के बीच",
          problem: "1/3 और 1/2 के बीच एक परिमेय संख्या खोजिए।",
          solution:
            "दोनों का औसत (1/3 + 1/2) ÷ 2 = 5/12 है। इसलिए 5/12 इनके बीच है।",
        },
      },
    ],
    keyTerms: [
      {
        term: "परिमेय संख्या",
        meaning: "जिसे p/q के रूप में लिखा जा सके, जहाँ q ≠ 0 हो।",
      },
      {
        term: "अपरिमेय संख्या",
        meaning: "जिसका दशमलव न समाप्त हो और न निश्चित रूप से दोहराए।",
      },
      {
        term: "वास्तविक संख्या",
        meaning: "संख्या रेखा पर दिखाई जाने वाली परिमेय या अपरिमेय संख्या।",
      },
    ],
    commonMistakes: [
      "हर न समाप्त होने वाले दशमलव को अपरिमेय मान लेना; दोहराने वाला दशमलव परिमेय होता है।",
      "भिन्न के हर में शून्य रखना।",
      "दो परिमेय संख्याओं के बीच केवल एक परिमेय संख्या मानना।",
    ],
    revisionPoints: [
      "प्राकृतिक ⊂ पूर्ण ⊂ पूर्णांक ⊂ परिमेय ⊂ वास्तविक।",
      "समाप्त या दोहराने वाला दशमलव परिमेय है।",
      "न समाप्त और न दोहराने वाला दशमलव अपरिमेय है।",
    ],
    questions: [
      {
        question: "क्या −7 परिमेय संख्या है?",
        answer: "हाँ, क्योंकि −7 = −7/1 लिखा जा सकता है।",
        difficulty: "basic",
      },
      {
        question: "2/5 और 3/5 के बीच एक परिमेय संख्या लिखिए।",
        answer: "1/2",
        explanation: "दोनों का औसत (2/5 + 3/5) ÷ 2 = 1/2 है।",
        difficulty: "standard",
      },
      {
        question: "0.1010010001… अपरिमेय क्यों है?",
        answer:
          "क्योंकि इसका दशमलव न समाप्त होता है और न कोई निश्चित समूह दोहराता है।",
        difficulty: "challenge",
      },
    ],
    reviewedAt: "2026-10-04",
    updatedAt: "2026-10-04",
  },
  {
    id: "class-9-polynomials-en",
    chapterId: "class-9-math-introduction-to-polynomials",
    locale: "en",
    title: "Introduction to Polynomials in Easy Words",
    description:
      "Learn terms, coefficients, degree and values of polynomials through clear Class 9 examples.",
    status: "published",
    searchIntent:
      "Understand Class 9 polynomial basics with simple examples and original answers.",
    prerequisites: [
      "Variables and constants",
      "Basic arithmetic",
      "Laws of exponents",
    ],
    learningObjectives: [
      "Recognise a polynomial",
      "Identify terms, coefficients and degree",
      "Evaluate a polynomial",
      "Distinguish linear, quadratic and cubic polynomials",
    ],
    sections: [
      {
        heading: "What is a polynomial?",
        paragraphs: [
          "A polynomial is an algebraic expression made from variables, constants and whole-number powers of variables. Its terms are joined using addition or subtraction.",
          "Expressions such as 3x² − 5x + 2 and 7 are polynomials. An expression containing 1/x is not a polynomial in x because it uses the negative power x⁻¹.",
        ],
        example: {
          label: "Recognition example",
          problem: "Is 4y³ − 2y + 9 a polynomial?",
          solution: "Yes. Every exponent of y is a non-negative whole number.",
        },
      },
      {
        heading: "Terms, coefficients and degree",
        paragraphs: [
          "In 5x² − 3x + 8, the terms are 5x², −3x and 8. The coefficients of x² and x are 5 and −3, while 8 is the constant term.",
          "The degree is the highest exponent with a non-zero coefficient. The degree of 5x² − 3x + 8 is 2, so it is quadratic.",
        ],
        example: {
          label: "Degree example",
          problem: "Find the degree of 2a⁴ + a² − 6.",
          solution: "The highest exponent is 4, so the degree is 4.",
        },
      },
      {
        heading: "Finding a polynomial's value",
        paragraphs: [
          "To evaluate a polynomial, replace its variable with the given number and simplify carefully. Use brackets when substituting a negative value.",
          "For p(x) = x² + 2x − 3, p(2) means 2² + 2×2 − 3 = 5.",
        ],
        example: {
          label: "Substitution example",
          problem: "For p(x) = x² − 4, find p(−3).",
          solution: "p(−3) = (−3)² − 4 = 9 − 4 = 5.",
        },
      },
    ],
    keyTerms: [
      {
        term: "Term",
        meaning: "One part of an expression separated by plus or minus signs.",
      },
      {
        term: "Coefficient",
        meaning: "The numerical factor multiplying a variable term.",
      },
      {
        term: "Degree",
        meaning: "The greatest exponent with a non-zero coefficient.",
      },
    ],
    commonMistakes: [
      "Treating a negative exponent as allowed in a polynomial.",
      "Forgetting that a non-zero constant polynomial has degree 0.",
      "Dropping brackets while substituting a negative value.",
    ],
    revisionPoints: [
      "Polynomial exponents are non-negative whole numbers.",
      "Highest exponent gives the degree.",
      "Substitute with brackets, then follow operation order.",
    ],
    questions: [
      {
        question: "What is the degree of 7x³ − x + 4?",
        answer: "3",
        difficulty: "basic",
      },
      {
        question: "Is 2/x + 1 a polynomial in x?",
        answer: "No, because 2/x = 2x⁻¹ has a negative exponent.",
        difficulty: "standard",
      },
      {
        question: "If p(x) = 2x² − 3x + 1, find p(−1).",
        answer: "6",
        explanation: "2(−1)² − 3(−1) + 1 = 2 + 3 + 1 = 6.",
        difficulty: "standard",
      },
    ],
    reviewedAt: "2026-10-04",
    updatedAt: "2026-10-04",
  },
  {
    id: "class-9-polynomials-hi",
    chapterId: "class-9-math-introduction-to-polynomials",
    locale: "hi",
    title: "बहुपद का परिचय आसान भाषा में",
    description:
      "सरल उदाहरणों से बहुपद के पद, गुणांक, घात और मान निकालना सीखें।",
    status: "published",
    searchIntent:
      "कक्षा 9 बहुपद के आधार को आसान हिंदी में मौलिक प्रश्न-उत्तर के साथ समझना।",
    prerequisites: ["चर और अचर", "मूल अंकगणित", "घातांक के नियम"],
    learningObjectives: [
      "बहुपद पहचानना",
      "पद, गुणांक और घात बताना",
      "बहुपद का मान निकालना",
      "रैखिक, द्विघात और घन बहुपद में अंतर करना",
    ],
    sections: [
      {
        heading: "बहुपद क्या है?",
        paragraphs: [
          "बहुपद ऐसा बीजीय व्यंजक है जिसमें चर, अचर और चर की पूर्ण गैर-ऋणात्मक घातें होती हैं। इसके पद जोड़ या घटाव से जुड़े होते हैं।",
          "3x² − 5x + 2 और 7 बहुपद हैं। 1/x वाला व्यंजक x में बहुपद नहीं है, क्योंकि 1/x को x⁻¹ लिखा जाता है।",
        ],
        example: {
          label: "पहचान का उदाहरण",
          problem: "क्या 4y³ − 2y + 9 बहुपद है?",
          solution: "हाँ। y की हर घात गैर-ऋणात्मक पूर्ण संख्या है।",
        },
      },
      {
        heading: "पद, गुणांक और घात",
        paragraphs: [
          "5x² − 3x + 8 में 5x², −3x और 8 पद हैं। x² और x के गुणांक 5 और −3 हैं, जबकि 8 अचर पद है।",
          "बहुपद की सबसे बड़ी घात, जिसका गुणांक शून्य न हो, बहुपद की घात कहलाती है। 5x² − 3x + 8 की घात 2 है।",
        ],
        example: {
          label: "घात का उदाहरण",
          problem: "2a⁴ + a² − 6 की घात बताइए।",
          solution: "सबसे बड़ा घातांक 4 है, इसलिए बहुपद की घात 4 है।",
        },
      },
      {
        heading: "बहुपद का मान निकालना",
        paragraphs: [
          "बहुपद का मान निकालने के लिए चर के स्थान पर दी गई संख्या रखकर सरल करें। ऋणात्मक संख्या रखते समय कोष्ठक लगाना जरूरी है।",
          "यदि p(x) = x² + 2x − 3 है, तो p(2) = 2² + 2×2 − 3 = 5 होगा।",
        ],
        example: {
          label: "प्रतिस्थापन उदाहरण",
          problem: "p(x) = x² − 4 के लिए p(−3) निकालिए।",
          solution: "p(−3) = (−3)² − 4 = 9 − 4 = 5।",
        },
      },
    ],
    keyTerms: [
      {
        term: "पद",
        meaning: "जोड़ या घटाव चिह्न से अलग होने वाला व्यंजक का एक भाग।",
      },
      {
        term: "गुणांक",
        meaning: "चर वाले पद को गुणा करने वाली संख्यात्मक राशि।",
      },
      { term: "घात", meaning: "गैर-शून्य गुणांक वाली सबसे बड़ी घात।" },
    ],
    commonMistakes: [
      "ऋणात्मक घात वाले व्यंजक को बहुपद मान लेना।",
      "गैर-शून्य अचर बहुपद की घात 0 भूल जाना।",
      "ऋणात्मक मान रखते समय कोष्ठक न लगाना।",
    ],
    revisionPoints: [
      "बहुपद में चर की घातें गैर-ऋणात्मक पूर्ण संख्याएँ होती हैं।",
      "सबसे बड़ा घातांक बहुपद की घात बताता है।",
      "पहले कोष्ठक के साथ मान रखें, फिर संक्रियाओं का क्रम अपनाएँ।",
    ],
    questions: [
      {
        question: "7x³ − x + 4 की घात क्या है?",
        answer: "3",
        difficulty: "basic",
      },
      {
        question: "क्या 2/x + 1, x में बहुपद है?",
        answer: "नहीं, क्योंकि 2/x = 2x⁻¹ में ऋणात्मक घात है।",
        difficulty: "standard",
      },
      {
        question: "p(x) = 2x² − 3x + 1 हो तो p(−1) निकालिए।",
        answer: "6",
        explanation: "2(−1)² − 3(−1) + 1 = 2 + 3 + 1 = 6।",
        difficulty: "standard",
      },
    ],
    reviewedAt: "2026-10-04",
    updatedAt: "2026-10-04",
  },
];
