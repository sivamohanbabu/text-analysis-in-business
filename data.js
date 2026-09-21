/* ==========================================================================
   NLP GENIUS: BUSINESS TEXT ANALYTICS ACADEMY - DATA STORE
   Course Code: 24INFS7101 - NLP and Text Analytics in Business
   ========================================================================== */

const NLP_DATA = {
  courseInfo: {
    code: "24INFS7101",
    title: "NLP AND TEXT ANALYTICS IN BUSINESS",
    credits: 3,
    level: 7,
    program: "MBA Programme & Executive Analytics",
    author: "Subject Matter Expert in Business Text Analytics"
  },

  units: [
    {
      id: "unit-1",
      number: "Unit I",
      title: "Foundations of Business Text Analytics & NLP",
      hours: "6 Hours",
      summary: "Discover how computers learn to read human text, turn messy emails and customer reviews into business gold, and handle privacy and ethics responsibly.",
      topics: [
        {
          id: "t1-1",
          title: "Nature of Business Text Data & Structured vs. Unstructured Data",
          concept: "Businesses receive data in two forms: Structured (neat tables like Excel with rows/columns) and Unstructured (free text like customer emails, tweets, call scripts, and PDF reports). Over 80% of enterprise data is unstructured!",
          eli5: "Imagine having a box of Lego bricks neatly sorted by color into labeled compartments (Structured Data). Now imagine a big toy box filled with messy letters, drawings, and secret diary notes (Unstructured Data). Text analytics is like giving your friendly robot special glasses so it can read all those handwritten diary notes and tell you what toys your friends love best!",
          bizValue: "Allows companies like Amazon or Zomato to automatically analyze 100,000 customer reviews in seconds instead of having humans read them manually.",
          keyTerms: [
            { term: "Structured Data", def: "Highly organized data in rigid tables (e.g., SQL tables, age, salary)." },
            { term: "Unstructured Data", def: "Data without a predefined format (e.g., text, audio, video)." }
          ]
        },
        {
          id: "t1-2",
          title: "Introduction to NLP & The Business NLP Pipeline",
          concept: "Natural Language Processing (NLP) bridges human language and machine understanding. An NLP Pipeline is a step-by-step assembly line: Data Ingestion -> Preprocessing -> Feature Extraction -> Modeling -> Business Insight/Dashboard.",
          eli5: "Think of an NLP Pipeline like making delicious orange juice! First, you pick raw oranges from trees (Gather Text Data). Then you wash away dirt and peel the skin (Text Preprocessing). Next, you squeeze out pure juice (Feature Extraction). Finally, you pour it into a shiny bottle for your lemonade stand (Business Dashboard)!",
          bizValue: "Standardizes text processing workflows in enterprises so sentiment scores automatically trigger customer refund alerts.",
          keyTerms: [
            { term: "NLP Pipeline", def: "The sequential workflow used to transform raw text into actionable insights." },
            { term: "Text Analytics", def: "Using statistics and machine learning to derive trends from text." }
          ]
        },
        {
          id: "t1-3",
          title: "Text Data Sources & Ethical Issues (Bias, Privacy, Cloud APIs)",
          concept: "Text sources span Marketing (reviews, tweets), HR (resumes, exit interviews), Finance (SEC filings, news), Operations (support tickets). Ethical NLP requires preventing algorithmic bias, respecting GDPR/privacy, and picking between local libraries (NLTK, spaCy) or Cloud APIs (AWS Comprehend, Google Cloud Natural Language, Azure AI).",
          eli5: "If you teach a parrot words only spoken by pirates, the parrot will talk like a pirate! Similarly, if we train AI on unfair or mean text, the AI will make unfair decisions (Bias). We must be good guardians and teach AI to treat everyone fairly while keeping people's secrets safe!",
          bizValue: "Ensures HR resume screening tools do not discriminate against candidates and protects customer PII (Personally Identifiable Information).",
          keyTerms: [
            { term: "Algorithmic Bias", def: "Systematic unfairness in model predictions caused by biased training data." },
            { term: "Cloud NLP APIs", def: "Pre-trained machine learning services accessible over HTTP (AWS, GCP, Azure)." }
          ]
        }
      ]
    },

    {
      id: "unit-2",
      number: "Unit II",
      title: "Text Preparation and Feature Engineering",
      hours: "6 Hours",
      summary: "Master the full 11-stage text preprocessing and feature engineering pipeline on a realistic MBA customer complaint review: text cleaning, normalization, tokenization, stopword removal, stemming, lemmatization, N-grams, Bag of Words, TF-IDF, domain vocabulary handling, business text feature extraction, and text visualization.",
      topics: [
        {
          id: "t2-1",
          title: "1. Text Cleaning & Normalization",
          concept: "Raw text from business sources contains markup noise (HTML tags, URLs, email addresses, emojis, and special punctuation). Text cleaning removes unwanted patterns using regular expressions (regex). Normalization standardizes casing (lowercasing), expands contractions ('don't' -> 'do not'), and applies Unicode NFKD normalization.",
          eli5: "Before baking a cake, you sift the flour to remove rocks and leaves (Text Cleaning). Normalization is making sure all words wear the same uniform (lowercasing) so 'SLA', 'sla', and 'Sla' are recognized as identical!",
          bizValue: "Eliminates formatting noise across customer support tickets, reducing memory overhead and preventing duplicate vocabulary entries.",
          keyTerms: [
            { term: "Regex (Regular Expressions)", def: "Pattern matching sequences used to identify and strip HTML tags, URLs, and emails." },
            { term: "Normalization", def: "Converting text variants (casing, accents, contractions) into a unified standard representation." }
          ],
          example: "Raw MBA Review: '<p>URGENT: Our Service Level Agreement (SLA) was breached due to late product delivery! Visit https://help.company.com for support. Customer Return on Investment (ROI) dropped by 20%. I demand an immediate refund or our company will churn NOW!!!</p>' -> Cleaned: 'urgent our service level agreement sla was breached due to late product delivery visit for support customer return on investment roi dropped by 20 i demand an immediate refund or our company will churn now'"
        },
        {
          id: "t2-2",
          title: "2. Tokenization (Word, Sentence & Subword using NLTK)",
          concept: "Tokenization partitions continuous text into discrete units called tokens using NLTK functions (nltk.word_tokenize() for words and nltk.sent_tokenize() for sentences). It converts unstructured text strings into structured arrays for downstream business models.",
          eli5: "Tokenization is like chopping a fruit salad into bite-sized apples and bananas! Using NLTK's word_tokenize(), your computer slices a giant wall of text into neat word blocks so it can count and analyze each one easily.",
          bizValue: "Enables structural analysis of support text, allowing sentiment analyzers to evaluate word-by-word sentiment scores.",
          keyTerms: [
            { term: "nltk.word_tokenize()", def: "Splits continuous text into individual word tokens while preserving punctuation boundaries." },
            { term: "nltk.sent_tokenize()", def: "Segmenting text into distinct sentences based on punctuation and capitalization rules." },
            { term: "Subword Tokenization", def: "Splitting rare words into sub-word pieces (e.g. 'unbeatably' -> 'un', 'beat', 'ably')." }
          ],
          example: "From MBA Review -> NLTK Tokens: ['urgent', 'our', 'service', 'level', 'agreement', 'sla', 'was', 'breached', 'due', 'to', 'late', 'product', 'delivery', 'visit', 'for', 'support', 'customer', 'return', 'on', 'investment', 'roi', 'dropped', 'by', '20', 'i', 'demand', 'an', 'immediate', 'refund', 'or', 'our', 'company', 'will', 'churn', 'now']"
        },
        {
          id: "t2-3",
          title: "3. Stopword Removal (Standard & Domain Custom Lists)",
          concept: "Stopwords are high-frequency, low-information function words (e.g., 'the', 'is', 'at', 'which'). Removing them compresses text vectors. Crucially, business domain pipelines must preserve negation words ('not', 'never', 'no') and remove domain-specific filler terms.",
          eli5: "Imagine peeling an orange! Stopwords are the bitter white pith and peel. You throw them away so you can enjoy only the juicy fruit slices (high-signal keywords).",
          bizValue: "Reduces vocabulary size by 60-80%, accelerating downstream ML training while prioritizing domain terms like 'defect', 'refund', or 'delay'.",
          keyTerms: [
            { term: "Stopwords", def: "High-frequency words stripped out because they carry little domain sentiment or semantic value." },
            { term: "Custom Stopword List", def: "Domain-tailored lists adding corporate noise words (e.g., 'thanks', 'regards', 'company')." }
          ],
          example: "From MBA Review -> Filtered Tokens: ['urgent', 'service', 'level', 'agreement', 'sla', 'breached', 'late', 'product', 'delivery', 'support', 'customer', 'return', 'investment', 'roi', 'dropped', 'demand', 'immediate', 'refund', 'company', 'churn']"
        },
        {
          id: "t2-4",
          title: "4. Stemming (Porter & Snowball)",
          concept: "Stemming truncates word suffixes using fast heuristic rules to map inflected words to a base root (stem). For example, PorterStemmer converts 'running', 'runner', 'runs' to 'runn'. While computationally fast, stemming may produce non-dictionary tokens (over-stemming).",
          eli5: "Stemming is like chopping tree branches with a fast hatchet! It works super fast, but sometimes it trims a branch a little too short, leaving a weird-looking stem.",
          bizValue: "Extremely fast feature reduction for high-throughput search engines and real-time log indexing.",
          keyTerms: [
            { term: "Porter Stemmer", def: "A classic 5-stage rule-based algorithm for stripping English suffixes." },
            { term: "Over-stemming", def: "Erroneously truncating different words to the same stem (e.g., 'universe' and 'university' -> 'univers')." }
          ],
          example: "From MBA Review -> Stemmed Tokens: ['urgent', 'servic', 'level', 'agreement', 'sla', 'breach', 'late', 'product', 'deliveri', 'support', 'custom', 'return', 'invest', 'roi', 'drop', 'demand', 'immedi', 'refund', 'compani', 'churn']"
        },
        {
          id: "t2-5",
          title: "5. Lemmatization (WordNet & spaCy)",
          concept: "Lemmatization uses morphological analysis, full dictionaries (WordNet), and Part-of-Speech (POS) tags to reduce words to their valid canonical base forms (lemmas). Unlike stemming, 'breached' becomes 'breach', and 'dropped' becomes 'drop'.",
          eli5: "Lemmatization is like asking a dictionary expert botanist! Instead of hacking branches, the botanist looks up the plant's exact Latin root name in a official encyclopedia.",
          bizValue: "Ensures legal, financial, and medical text analytics preserve grammatical accuracy and search quality.",
          keyTerms: [
            { term: "Lemma", def: "The canonical dictionary form of a set of words." },
            { term: "POS-Aware Lemmatization", def: "Using noun/verb/adjective context tags to find accurate root forms." }
          ],
          example: "From MBA Review -> Lemmatized Tokens: ['urgent', 'service', 'level', 'agreement', 'sla', 'breach', 'late', 'product', 'delivery', 'support', 'customer', 'return', 'investment', 'roi', 'drop', 'demand', 'immediate', 'refund', 'company', 'churn']"
        },
        {
          id: "t2-6",
          title: "6. N-grams & Phrase Detection",
          concept: "N-grams are contiguous sequences of N words (Unigrams N=1, Bigrams N=2, Trigrams N=3). Phrase detection groups multi-word expressions (e.g., 'customer_support', 'credit_card', 'late_delivery') that carry significantly more business meaning than individual isolated words.",
          eli5: "Single words are like puzzle pieces. 'Late' and 'delivery' separately seem fine, but when you snap them together as a Bigram 'late delivery', you discover the true picture!",
          bizValue: "Captures multi-word issue phrases in customer feedback, distinguishing 'great customer service' from 'poor customer service'.",
          keyTerms: [
            { term: "N-gram", def: "A contiguous sequence of N items from a given sample of text." },
            { term: "Phrase Detection", def: "Automated statistical detection of co-occurring terms (e.g. Gensim Phrases)." }
          ],
          example: "From MBA Review -> Bigrams: [('sla', 'breach'), ('late', 'product'), ('product', 'delivery'), ('immediate', 'refund'), ('company', 'churn')]"
        },
        {
          id: "t2-7",
          title: "7. Bag of Words (BoW) & TF-IDF Vectorization",
          concept: "Bag of Words (BoW) represents text as numerical term counts regardless of order. TF-IDF (Term Frequency-Inverse Document Frequency) improves on BoW by weighting terms: TF rewards frequent words in a document, while IDF penalizes words common across all documents.",
          eli5: "BoW simply counts how many times each word appears in a bucket. TF-IDF acts like a smart magnifying glass—it highlights rare words like 'sla breach' while ignoring common words like 'product'.",
          bizValue: "Transforms unstructured text into high-performance numeric sparse matrices suitable for scikit-learn classifiers.",
          keyTerms: [
            { term: "Term Frequency (TF)", def: "Ratio of a word's count to total words in a specific document." },
            { term: "Inverse Document Frequency (IDF)", def: "Logarithmic weight discounting words frequent across the entire corpus." },
            { term: "TfidfVectorizer", def: "Scikit-learn class that converts a text collection into a TF-IDF weighted sparse matrix." }
          ],
          example: "From MBA Review -> BoW vector: {'sla': 1, 'breach': 1, 'delivery': 1, 'refund': 1, 'churn': 1} | High TF-IDF Scores: 'sla', 'breach', 'churn', 'refund'"
        },
        {
          id: "t2-8",
          title: "8. Word Frequency & Keyword Extraction",
          concept: "Word frequency counts surface dominant vocabulary trends. Keyword extraction algorithms (TF-IDF ranking, RAKE, YAKE) identify the top keyphrases that best summarize document intent without requiring manual reading.",
          eli5: "Keyword extraction is like picking out the 3 biggest headlines from a 10-page newspaper report so the CEO gets the summary in 5 seconds!",
          bizValue: "Automatically aggregates trending root causes in thousands of daily call center transcripts for management reporting.",
          keyTerms: [
            { term: "Word Frequency Distribution", def: "Statistical breakdown of word counts across a corpus." },
            { term: "Keyword Extraction", def: "Algorithmic selection of high-scoring keyphrases summarizing text intent." }
          ],
          example: "From MBA Review -> Extracted Keywords: ['sla breached', 'late product delivery', 'immediate refund', 'company churn']"
        },
        {
          id: "t2-9",
          title: "9. Handling Domain-Specific Business Vocabulary",
          concept: "Enterprise text contains specialized acronyms (SLA, ROI, EBITDA, KPI, PII), corporate jargon, and product SKUs. Preprocessing pipelines must expand acronyms via business lookup dictionaries, protect brand entities, and filter corporate boilerplate.",
          eli5: "If a new worker joins your office, they won't understand company nicknames like 'SLA' or 'ROI'. Domain vocabulary handling is giving the AI a cheat-sheet glossary so it speaks fluent business!",
          bizValue: "Prevents critical business acronyms from being misclassified or discarded as unknown words in automated compliance systems.",
          keyTerms: [
            { term: "Acronym Expansion", def: "Replacing shorthand abbreviations with full expanded business phrases (e.g. 'SLA' -> 'Service Level Agreement')." },
            { term: "Domain Lexicon", def: "A specialized dictionary mapping industry terms to standard business definitions." }
          ],
          example: "From MBA Review -> Acronym Expanded: 'urgent our service level agreement was breached due to late product delivery ... customer return on investment dropped by 20 ...'"
        },
        {
          id: "t2-10",
          title: "10. Feature Engineering for Business Text",
          concept: "Beyond bag-of-words vectors, text feature engineering creates tabular numeric predictors: text length, word count, uppercase character ratio (urgency/shouting indicator), punctuation count ('!'), POS tag distributions (noun/verb ratios), readability formulas (Flesch-Kincaid), and sentiment scores.",
          eli5: "Imagine judging a customer email! You don't just read the words—you also notice if it's written in ALL CAPS, has 10 exclamation points, or is 5 pages long! Feature engineering turns those clues into numbers for machine learning.",
          bizValue: "Boosts predictive performance in churn prediction, fraud detection, and customer ticket priority routing.",
          keyTerms: [
            { term: "Text Surface Features", def: "Numeric indicators like character count, word count, and uppercase letter ratio." },
            { term: "Flesch Reading Ease", def: "A readability formula estimating text complexity based on word and syllable counts." }
          ],
          example: "From MBA Review -> Extracted Feature Vector: {char_length: 245, word_count: 35, uppercase_ratio: 0.065, exclamation_count: 4, has_html: 1, urgency_flag: 1, churn_flag: 1}"
        },
        {
          id: "t2-11",
          title: "11. Introduction to Text Data Visualization (Word Clouds & Term Networks)",
          concept: "Text data visualization converts complex linguistic corpora into executive visual dashboards. Word Clouds highlight high-frequency keywords using font size scaling. Term Co-occurrence Networks (using NetworkX) map relationships and co-occurrence graphs between business entities.",
          eli5: "Word Clouds turn word counts into a colorful visual picture where big words mean big issues! Term Networks draw spiderwebs connecting words like 'urgent' -> 'sla' -> 'breach'.",
          bizValue: "Provides intuitive visual reporting for executive boardrooms, marketing campaign tracking, and operational bottlenecks.",
          keyTerms: [
            { term: "Word Cloud", def: "Visual display of text data where term frequency determines word size and prominence." },
            { term: "Term Co-occurrence Network", def: "A network graph mapping pairs of words that frequently appear together in documents." }
          ],
          example: "Support Corpus -> Generates a Word Cloud featuring 'DELIVERY', 'REFUND', 'SUPPORT' alongside a co-occurrence network."
        }
      ]
    },

    {
      id: "unit-3",
      number: "Unit III",
      title: "Text Mining and Insight Extraction",
      hours: "6 Hours",
      summary: "Uncover hidden emotions in customer feedback, group documents automatically into themes with LDA Topic Modeling, and extract company names, locations, and money using Named Entity Recognition (NER).",
      topics: [
        {
          id: "t3-1",
          title: "Sentiment Analysis & Opinion Mining (Rule-Based vs. Machine Learning)",
          concept: "Sentiment analysis classifies text tone (Positive, Negative, Neutral) and specific emotions (Joy, Anger, Disgust). Rule-based systems (VADER, TextBlob) use word dictionaries. ML-based systems (Naïve Bayes, Decision Trees, SVM) learn patterns from labeled training data.",
          eli5: "Rule-based sentiment is like a robot carrying a dictionary with score points next to words (+1 for 'awesome', -1 for 'terrible'). ML sentiment is like a child watching 1,000 movies and learning by experience when someone is sarcastic or happy!",
          bizValue: "Enables brand reputation tracking—detecting sudden spikes in negative social media posts after a product update.",
          keyTerms: [
            { term: "Sentiment Polarity", def: "A metric ranging from -1 (Extremely Negative) to +1 (Extremely Positive)." },
            { term: "VADER", def: "Valence Aware Dictionary and sEntiment Reasoner optimized for social media text." }
          ]
        },
        {
          id: "t3-2",
          title: "Topic Modeling (LDA) & Text Classification",
          concept: "Latent Dirichlet Allocation (LDA) is an unsupervised technique that discovers hidden thematic topics across a collection of documents. Text classification is supervised learning assigning documents to predefined classes (e.g., Spam vs Non-Spam).",
          eli5: "Imagine dumping 500 unorganized storybooks onto the floor. Topic Modeling is a magical sorting hat that scans all pages and groups them into 3 piles: Magic Wizards, Outer Space Rockets, and Underwater Dolphins without reading titles!",
          bizValue: "Automatically routes incoming customer support emails to the correct department (Billing, Tech Support, Refunds).",
          keyTerms: [
            { term: "LDA (Latent Dirichlet Allocation)", def: "A probabilistic model assuming documents are mixtures of hidden topics." },
            { term: "Text Classification", def: "Supervised task of categorizing text into fixed labels." }
          ]
        },
        {
          id: "t3-3",
          title: "Named Entity Recognition (NER) & Text Summarization",
          concept: "NER identifies named entities in text (People, Organizations, Locations, Monetary Values, Dates). Text Summarization produces concise summaries using Extractive (picking key sentences) or Abstractive (rephrasing like human summaries) methods.",
          eli5: "NER is like putting highlighter pens on a textbook: Pink highlighter for people's names (Elon Musk), Yellow for companies (Google), and Green for cash ($50 Million). Summarization is reading a 100-page comic book and telling your best friend the story in 2 minutes!",
          bizValue: "Extracts financial terms and company names from financial reports to automate stock trading signals.",
          keyTerms: [
            { term: "NER", def: "Information extraction task identifying real-world entities." },
            { term: "Extractive Summarization", def: "Selecting important sentences directly from original text." },
            { term: "Abstractive Summarization", def: "Generating new sentences using natural language generation." }
          ]
        }
      ]
    },

    {
      id: "unit-4",
      number: "Unit IV",
      title: "Advanced NLP Applications & Transformers",
      hours: "6 Hours",
      summary: "Step into the world of AI word vectors (Word2Vec), modern Transformer super-brains (BERT), conversational chatbots, and business intelligence integrations.",
      topics: [
        {
          id: "t4-1",
          title: "Word Embeddings (Word2Vec, GloVe, FastText)",
          concept: "Word Embeddings map words into continuous multi-dimensional vector spaces where semantically similar words sit close together. Captures relationships like Vector('King') - Vector('Man') + Vector('Woman') = Vector('Queen').",
          eli5: "Imagine a 3D playground map where every word gets a GPS coordinate. 'Apple' and 'Banana' sit on the fruit bench next to each other. 'Airplane' sits far away near the clouds. If you ask 'King minus Man plus Woman', the GPS arrow points straight to 'Queen'!",
          bizValue: "Improves semantic search on e-commerce sites—finding 'winter coat' even when the user searches for 'warm jacket'.",
          keyTerms: [
            { term: "Vector Space Model", def: "Representing words as lists of numbers (vectors) in geometry." },
            { term: "Word2Vec", def: "Neural network model (Skip-gram / CBOW) producing word embeddings." }
          ]
        },
        {
          id: "t4-2",
          title: "Contextual Embeddings & Transformers (BERT - Conceptual Level)",
          concept: "Traditional embeddings give a word ONE fixed vector regardless of context. Transformers (like BERT: Bidirectional Encoder Representations from Transformers) look at surrounding context in both directions to dynamically adjust word meanings (e.g., 'river bank' vs 'money bank').",
          eli5: "Old word models were like a chameleon stuck in green paint—the word 'bank' always meant the same thing. BERT is a super smart chameleon that looks left and right: if it sees fish, 'bank' turns into a riverbank; if it sees money, 'bank' turns into a vault!",
          bizValue: "Powers state-of-the-art search engines, Google Search algorithms, and enterprise document search.",
          keyTerms: [
            { term: "BERT", def: "Pre-trained Transformer architecture reading text bidirectionally." },
            { term: "Attention Mechanism", def: "Neural network layer allowing models to focus on relevant words." }
          ]
        },
        {
          id: "t4-3",
          title: "Chatbots, Conversational AI & NLP in CRM, HR & Finance",
          concept: "Conversational AI uses Intent Recognition, Entity Extraction, and Dialogue State Tracking. Enterprise NLP automates CRM (lead scoring), HR (resume matching & exit interviews), Finance (fraud detection & earnings call analysis).",
          eli5: "A chatbot is like a digital hotel receptionist who never sleeps! When you say 'I want a pizza', it figures out your Intent (Order Food) and Entities (Item = Pizza), then talks to the kitchen to deliver your food right away!",
          bizValue: "Saves up to 70% of customer support desk costs while maintaining 24/7 instant response times.",
          keyTerms: [
            { term: "Intent Recognition", def: "Determining what action the user wants to accomplish." },
            { term: "Dialogue Management", def: "Tracking conversation turn-taking and context memory." }
          ]
        }
      ]
    },

    {
      id: "unit-5",
      number: "Unit V",
      title: "Strategy, Governance, and Implementation",
      hours: "6 Hours",
      summary: "Master the NLP project lifecycle from problem definition to deployment, calculate ROI, ensure Explainable AI (XAI), and navigate legal and ethical governance.",
      topics: [
        {
          id: "t5-1",
          title: "Designing NLP Business Solutions & NLP Project Lifecycle",
          concept: "Successful NLP projects follow a 6-stage lifecycle: Problem Formulation -> Data Collection & Annotation -> Preprocessing & Modeling -> Evaluation -> Deployment -> Monitoring & Governance.",
          eli5: "Building an enterprise NLP app is like constructing a skyscraper! First you draw blueprints (Problem Definition), pour strong concrete foundations (Data Collection), assemble steel beams (Modeling), test for earthquakes (Validation), and hire security guards to look after the building (Monitoring)!",
          bizValue: "Prevents project failures by aligning technical metrics (F1-score, Accuracy) with core business KPIs (Cost Reduction, Customer CSAT).",
          keyTerms: [
            { term: "NLP Lifecycle", def: "End-to-end framework covering data collection to production maintenance." },
            { term: "Model Drift", def: "Degradation of model accuracy over time due to changing real-world text patterns." }
          ]
        },
        {
          id: "t5-2",
          title: "ROI Measurement & Explainable AI (XAI)",
          concept: "Text analytics ROI is measured through operational efficiency, churn reduction, and revenue uplift. Explainable AI (XAI tools like SHAP, LIME) makes complex 'black-box' NLP models transparent to regulators and managers.",
          eli5: "Imagine a magic detective AI that denies a bank loan. If the bank manager asks 'Why did you say no?', the AI shouldn't just shrug! Explainable AI is giving the robot a microphone so it can point to exact clues in the document and explain its reasoning clearly!",
          bizValue: "Essential for financial and healthcare compliance where regulations require auditability of automated decisions.",
          keyTerms: [
            { term: "ROI (Return on Investment)", def: "(Financial Benefits - Project Costs) / Project Costs * 100." },
            { term: "LIME / SHAP", def: "Model-agnostic interpretability tools explaining individual prediction outputs." }
          ]
        },
        {
          id: "t5-3",
          title: "Legal, Ethical & Governance Issues in Enterprise NLP",
          concept: "Deployment challenges involve data privacy (GDPR, HIPAA), copyright in LLM training, toxic language filtering, model hallucinations, and establishing AI Ethics Boards inside organizations.",
          eli5: "Just like cars need seatbelts, speed limits, and traffic lights to keep drivers safe, enterprise AI needs legal rules, safety fences, and ethical check-posts so AI never tells fibs or hurts anyone!",
          bizValue: "Protects enterprises from lawsuit risks, reputational damage, and regulatory fines.",
          keyTerms: [
            { term: "AI Governance", def: "Framework of rules, policies, and controls oversight for AI systems." },
            { term: "Hallucination", def: "When a generative NLP model confidently generates false or fabricated information." }
          ]
        }
      ]
    }
  ],

  quizzes: [
    {
      id: "q1",
      unitId: "unit-1",
      question: "Which of the following is the best example of UNSTRUCTURED business text data?",
      options: [
        "A relational database table containing employee age and salary",
        "A collection of 5,000 customer complaint emails and social media reviews",
        "An Excel spreadsheet formatted with fixed columns for order ID and date",
        "A CSV file containing numerical stock prices"
      ],
      correctIndex: 1,
      explanation: "Customer emails and social media reviews have free-form text with no fixed tabular schema, making them classic examples of unstructured data. Tables and CSVs with fixed columns are structured data."
    },
    {
      id: "q2",
      unitId: "unit-1",
      question: "What is the correct sequential order of a typical NLP Pipeline?",
      options: [
        "Feature Extraction -> Model Training -> Raw Text Collection -> Preprocessing",
        "Preprocessing -> Raw Text Collection -> Feature Extraction -> Dashboard",
        "Raw Text Collection -> Text Preprocessing -> Feature Extraction -> Model Training -> Business Insight",
        "Model Training -> Raw Text Collection -> Feature Extraction -> Evaluation"
      ],
      correctIndex: 2,
      explanation: "An NLP Pipeline always starts with raw data collection, followed by cleaning/preprocessing, converting text to features (numerical representations), training models, and presenting business insights."
    },
    {
      id: "q3",
      unitId: "unit-1",
      question: "Why is Algorithmic Bias a critical ethical issue when using NLP for HR resume screening?",
      options: [
        "Because NLP models run too slowly on server clusters",
        "Because training on historical hiring data may perpetuate past gender or racial hiring discrimination",
        "Because resumes are always saved in PDF format",
        "Because cloud APIs charge per API request"
      ],
      correctIndex: 1,
      explanation: "If historical training data contains past human hiring biases (e.g. favoring male candidates), the NLP model will learn and automate those unfair biases."
    },
    {
      id: "q4",
      unitId: "unit-2",
      question: "In text preprocessing, what does 'Tokenization' do?",
      options: [
        "It converts words into foreign languages",
        "It breaks continuous text into individual units such as words or subwords",
        "It calculates the financial value of a company",
        "It encrypts sensitive credit card numbers"
      ],
      correctIndex: 1,
      explanation: "Tokenization splits a continuous sentence (e.g. 'NLP is great!') into discrete tokens ['NLP', 'is', 'great', '!']."
    },
    {
      id: "q5",
      unitId: "unit-2",
      question: "What is the key difference between Stemming and Lemmatization?",
      options: [
        "Stemming uses dictionary vocabulary analysis, while Lemmatization chops suffixes with crude rules",
        "Stemming is rule-based and can produce non-words (e.g., 'runn'), while Lemmatization returns valid dictionary words (lemmas)",
        "Lemmatization only works on numbers, while Stemming works on words",
        "There is no difference; both produce identical results in python NLTK"
      ],
      correctIndex: 1,
      explanation: "Stemming chops word endings using fast, crude rules (e.g. 'caring' -> 'car'), whereas Lemmatization uses morphological analysis with WordNet to return valid dictionary root words (e.g. 'caring' -> 'care')."
    },
    {
      id: "q6",
      unitId: "unit-2",
      question: "Why does TF-IDF assign a lower weight to the word 'the' in a document collection?",
      options: [
        "Because 'the' is a short word with only 3 letters",
        "Because IDF penalizes words that appear frequently across almost ALL documents in the corpus",
        "Because 'the' is an upper-case letter",
        "Because Python dictionary lookup fails on short words"
      ],
      correctIndex: 1,
      explanation: "Inverse Document Frequency (IDF) penalizes common words like 'the' that appear in every document because they carry zero discriminative power."
    },
    {
      id: "q7",
      unitId: "unit-3",
      question: "Which technique would you use to automatically discover hidden thematic topics (e.g. 'Flight Delays', 'Baggage Loss') across 50,000 airline reviews without prior labels?",
      options: [
        "Named Entity Recognition (NER)",
        "Latent Dirichlet Allocation (LDA) Topic Modeling",
        "Porter Stemmer",
        "Regular Expression match"
      ],
      correctIndex: 1,
      explanation: "LDA is an unsupervised topic modeling algorithm ideal for discovering hidden thematic clusters across unlabeled text documents."
    },
    {
      id: "q8",
      unitId: "unit-3",
      question: "If an NLP system highlights 'Google' as ORG, 'Sundar Pichai' as PERSON, and '$100 Million' as MONEY, which technique is being executed?",
      options: [
        "Stemming",
        "Bag of Words",
        "Named Entity Recognition (NER)",
        "Text Summarization"
      ],
      correctIndex: 2,
      explanation: "Named Entity Recognition (NER) locates and categorizes entities into pre-defined categories like Organizations, Persons, and Monetary values."
    },
    {
      id: "q9",
      unitId: "unit-4",
      question: "What major limitation of traditional static word embeddings (like Word2Vec) does BERT solve?",
      options: [
        "Word2Vec cannot run on GPU servers",
        "Word2Vec assigns a single fixed vector to a word regardless of context, whereas BERT generates contextual embeddings based on surrounding text",
        "BERT cannot process English sentences",
        "Word2Vec requires HTML input"
      ],
      correctIndex: 1,
      explanation: "Word2Vec gives 'bank' the exact same vector in 'river bank' and 'investment bank'. BERT reads text bidirectionally to create context-aware representations."
    },
    {
      id: "q10",
      unitId: "unit-5",
      question: "Why is Explainable AI (XAI) such as SHAP or LIME essential when deploying NLP for loan application processing?",
      options: [
        "It makes the web page load 10x faster",
        "It provides auditability by explaining which text features caused a specific approval or rejection decision",
        "It eliminates the need for Python packages",
        "It reduces server memory to zero"
      ],
      correctIndex: 1,
      explanation: "Financial regulators require transparency so banks can justify automated decision-making and prove freedom from discriminatory practices."
    }
  ],

  examPrep: {
    midExam: {
      title: "Mid-Semester Examination Preparation (Units 1 & 2)",
      weightage: "20% Total Course Weightage | Duration: 90 Minutes",
      shortAnswer: [
        {
          q: "Q1. Differentiate between structured and unstructured business data with real-world enterprise examples.",
          a: "Structured Data is highly organized, tabular data residing in relational databases with fixed schemas (e.g., customer account balances, SQL records). Unstructured Data lacks a predefined data model (e.g., customer review text, support emails, social media feeds). Unstructured text accounts for ~80% of business data."
        },
        {
          q: "Q2. Explain the difference between Stemming and Lemmatization.",
          a: "Stemming applies heuristic rule-based chopping of word suffixes (e.g., Porter Stemmer converting 'studies' to 'studi'). Lemmatization utilizes morphological dictionaries (WordNet) and POS tags to return grammatically accurate root forms ('lemmas') such as 'studies' -> 'study'."
        },
        {
          q: "Q3. Define Stop Words and state why they are removed during text preprocessing.",
          a: "Stop Words are high-frequency words (e.g. 'and', 'the', 'is') carrying minimal domain-specific semantic value. Removing them reduces corpus dimensionality, speeds up training, and highlights high-signal keywords."
        },
        {
          q: "Q4. Explain TF-IDF and state its mathematical formula.",
          a: "TF-IDF (Term Frequency-Inverse Document Frequency) measures term importance in a document relative to a corpus. Formula: TF-IDF(t, d, D) = TF(t, d) * log(N / DF(t)), where TF is term count in document d, N is total documents, and DF is count of documents containing term t."
        }
      ],
      analytical: [
        {
          title: "Analytical Case: Preprocessing Pipeline for 20,000 E-Commerce Customer Reviews",
          problem: "A retail enterprise has collected 20,000 unstructured customer reviews. Design an end-to-end Python preprocessing pipeline to prepare this dataset for sentiment classification.",
          solutionSteps: [
            "1. Lowercasing & Noise Removal: Strip HTML tags, URLs, special characters, and convert text to lowercase.",
            "2. Tokenization: Split review strings into individual word tokens using spaCy / NLTK word_tokenize.",
            "3. Stopword Filtering: Remove standard English stopwords while preserving sentiment negation words like 'not', 'neither', 'nor'.",
            "4. Lemmatization: Map words to root lemmas using spaCy POS tagger ('badly' -> 'bad', 'running' -> 'run').",
            "5. N-gram Feature Generation: Create unigrams and bigrams ('not happy') to capture contextual phrases.",
            "6. Vectorization: Construct TF-IDF matrix with min_df=5 and max_df=0.85 to eliminate rare noise and ultra-common terms."
          ]
        }
      ]
    },

    endExam: {
      title: "End-Semester Theory Examination Preparation (Units 1 - 5)",
      weightage: "50% Total Course Weightage | Duration: 3 Hours",
      partA: [
        { q: "Q1. What is Word2Vec? Explain Skip-gram vs. CBOW architectures.", a: "Word2Vec is a neural embedding model representing words in dense vector spaces. Continuous Bag-of-Words (CBOW) predicts a target word from context words. Skip-gram predicts surrounding context words given a target word." },
        { q: "Q2. Explain the fundamental conceptual mechanism behind BERT.", a: "BERT (Bidirectional Encoder Representations from Transformers) uses Transformer Encoders to read word sequences bidirectionally, generating dynamic contextual embeddings where word meanings adjust according to left and right surrounding words." },
        { q: "Q3. Define Named Entity Recognition (NER) and list 4 common business entity types.", a: "NER is an information extraction technique identifying key entities in text. Types: ORGANIZATION (e.g. Apple), PERSON (e.g. Tim Cook), LOCATION/GPE (e.g. New York), MONEY (e.g. $50M)." },
        { q: "Q4. Explain Explainable AI (XAI) in enterprise text analytics.", a: "XAI provides interpretability frameworks (LIME/SHAP) that expose feature importance weights behind black-box model predictions, ensuring regulatory auditability and bias mitigation." }
      ],
      partB: [
        {
          title: "Comprehensive Architecture Design: Multinational Bank Complaint Automation",
          problem: "Design an enterprise-grade NLP architecture for a multinational bank to automate customer complaint ingestion, sentiment severity scoring, topic routing, and BI executive dashboarding.",
          architecturalBlocks: [
            "1. Ingestion Layer: API gateway collecting emails, chat logs, and mobile app tickets into secure S3 bucket.",
            "2. Cleaning & PII Masking: Anonymize credit card numbers, SSNs, and names using spaCy NER rules before storage.",
            "3. Multi-Task NLP Engine: Fine-tuned BERT model performing (a) 5-class Sentiment Severity Scoring, (b) Intent Classification, (c) NER for branch/product identification.",
            "4. Topic Modeling & Trend Detection: Online LDA topic modeling identifying emerging systemic issues (e.g. 'mobile app login crash').",
            "5. BI & CRM Integration: Direct integration with Salesforce & PowerBI dashboards triggering instant SLA escalations for high-severity churn risks.",
            "6. Governance & XAI Audit: SHAP explainer logging feature attributions for regulatory compliance."
          ]
        }
      ]
    },

    capstone: {
      title: "Capstone Project Guide (Units 1 - 4)",
      weightage: "30% Total Course Weightage | Group Project (3-5 Students)",
      options: [
        {
          id: "cap-1",
          name: "Option 1: E-Commerce Customer Review & Sentiment Analytics",
          dataset: "50,000 Amazon / Flipkart product reviews",
          objectives: "Preprocess raw text, extract sentiment trends over time, perform LDA topic modeling to identify product defects, build interactive dashboard recommendations.",
          pythonCode: `import pandas as pd
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation
from nltk.sentiment import SentimentIntensityAnalyzer

# Load Dataset
df = pd.read_csv('amazon_reviews.csv')
sia = SentimentIntensityAnalyzer()
df['sentiment_score'] = df['review_text'].apply(lambda x: sia.polarity_scores(str(x))['compound'])

# TF-IDF Vectorization
tfidf = TfidfVectorizer(max_features=1000, stop_words='english', ngram_range=(1,2))
dtm = tfidf.fit_transform(df['review_text'].dropna())

# Topic Modeling with LDA
lda = LatentDirichletAllocation(n_components=5, random_state=42)
lda.fit(dtm)
print("Topics discovered successfully!")`
        },
        {
          id: "cap-2",
          name: "Option 2: HR Analytics & Employee Attrition Opinion Mining",
          dataset: "15,000 Glassdoor employee company reviews",
          objectives: "Analyze 'Pros' and 'Cons' text columns, compute sentiment polarity, perform aspect-based sentiment analysis (Management, Pay, Work-Life Balance), and recommend HR retention strategies.",
          pythonCode: `# Sample HR Text Mining Snippet
import spacy
nlp = spacy.load("en_core_web_sm")

text = "Great compensation package, but management pressure is very stressful."
doc = nlp(text)
for token in doc:
    if token.pos_ in ["ADJ", "NOUN"]:
        print(f"Token: {token.text} | POS: {token.pos_} | Lemma: {token.lemma_}")`
        },
        {
          id: "cap-3",
          name: "Option 3: Financial News Mining & Market Sentiment Prediction",
          dataset: "Financial Times / Reuters news headlines and SEC filings",
          objectives: "Extract company entities with NER, compute daily financial market sentiment scores, correlate sentiment spikes with stock price movements.",
          pythonCode: `# Financial NER & Sentiment Analysis
from transformers import pipeline
nlp_ner = pipeline("ner", aggregation_strategy="simple")
res = nlp_ner("Tesla stock jumped 8% after Elon Musk announced new battery plant in Texas.")
print(res)`
        }
      ]
    }
  }
};
