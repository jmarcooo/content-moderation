// config.js
const Config = {
    // Shared Queue Definitions
    queues: [
        { id: 'bp_img',   category: 'BP', name: 'Dynamic Image Review',   aht: '12s', latency: '1m 20s' },
        { id: 'bp_vid',   category: 'BP', name: 'Dynamic Video Review',   aht: '45s', latency: '3m 45s' },
        { id: 'bp_com',   category: 'BP', name: 'Comment Review',         aht: '5s',  latency: '0m 30s' },
        // ... add the rest here
    ],

    // Violation Reasons for Review Page
    violations: {
        "Insults": ["Personal Attacks", "Bullying", "Hate Speech"],
        "Spam": ["Advertising", "Scams", "Repeated Content"],
        "Violence": ["Graphic Imagery", "Threats"],
        "Adult Content": ["Nudity", "Sexual Acts"]
    }
};
