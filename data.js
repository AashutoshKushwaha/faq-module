const faqsData = require('./faqs.json');

// Flatten the FAQs
const faqs = [];
for (const category in faqsData) {
    faqsData[category].forEach(faq => {
        faqs.push({ category, ...faq });
    });
}
console.log('FAQs loaded:', faqs);

module.exports = faqs;
