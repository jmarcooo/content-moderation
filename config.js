const Config = {
    // Shared Queue Definitions
    queues: [
        { id: 'bp_img',   category: 'BP', name: 'Dynamic Image Review',   aht: '12s', latency: '1m 20s' },
        { id: 'bp_vid',   category: 'BP', name: 'Dynamic Video Review',   aht: '45s', latency: '3m 45s' },
        { id: 'bp_com',   category: 'BP', name: 'Comment Review',         aht: '5s',  latency: '0m 30s' },
        { id: 'gp_img',   category: 'GP', name: 'Dynamic Image Review',   aht: '15s', latency: '5m 10s' },
        { id: 'gp_com',   category: 'GP', name: 'Comment Review',         aht: '4s',  latency: '1m 05s' },
        { id: 'gp_vid',   category: 'GP', name: 'Dynamic Video Review',   aht: '55s', latency: '8m 20s' },
        { id: 'comm_ava', category: 'Community', name: 'Avatar Review',    aht: '8s',  latency: '2m 15s' },
        { id: 'comm_nick', category: 'Community', name: 'Nickname Review',  aht: '3s',  latency: '0m 50s' },
        { id: 'comm_prof', category: 'Community', name: 'Profile Review',   aht: '20s', latency: '4m 30s' }
    ],

    // Violation Reasons for Review Page
    violations: {
        "Insults": ["Personal Attacks", "Bullying", "Hate Speech"],
        "Spam": ["Advertising", "Scams", "Repeated Content"],
        "Violence": ["Graphic Imagery", "Threats"],
        "Adult Content": ["Nudity", "Sexual Acts"]
    }
};
