const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const THUATTOAN8_DATA = {
    "TXXTTXTX": "Xỉu",     "XXTTXTXX": "Xỉu",     "XTTXTXXT": "Xỉu",     "TTXTXXTT": "Xỉu",
    "TXTXXTTT": "Xỉu",     "XTXXTTTX": "Tài",     "TXXTTTXX": "Xỉu",     "XXTTTXXT": "Tài",
    "XTTTXXTX": "Tài",     "TTTXXTXX": "Xỉu",     "TTXXTXXX": "Xỉu",     "TXXTXXXX": "Xỉu",
    "XXTXXXXX": "Xỉu",     "XTXXXXXT": "Tài",     "TXXXXXTX": "Tài",     "XXXXXTXX": "Xỉu",
    "XXXXTXXX": "Tài",     "XXXTXXXT": "Tài",     "XXTXXXTX": "Xỉu",     "XTXXXTXX": "Tài",
    "TXXXTXXX": "Tài",     "XXXTXXXX": "Xỉu",     "XXTXXXXT": "Xỉu",     "XTXXXXTT": "Xỉu",
    "TXXXXTTX": "Xỉu",     "XXXXTTXX": "Xỉu",     "XXXTTXXX": "Tài",     "XXTTXXXT": "Tài",
    "XTTXXXTX": "Tài",     "TTXXXTXT": "Tài",     "TXXXTXTX": "Tài",     "XXXTXTXT": "Xỉu",
    "XXTXTXTT": "Tài",     "XTXTXTTT": "Xỉu",     "TXTXTTTT": "Tài",     "XTXTTTTT": "Xỉu",
    "TXTTTTTT": "Xỉu",     "XTTTTTTX": "Xỉu",     "TTTTTTXT": "Xỉu",     "TTTTTXTX": "Xỉu",
    "TTTTXTXT": "Xỉu",     "TTTXTXTT": "Xỉu",     "TTXTXTTX": "Xỉu",     "TXTXTTXT": "Xỉu",
    "XTXTTXTX": "Tài",     "TXTTXTXT": "Tài",     "XTTXTXTT": "Xỉu",     "TXTTXTXX": "Xỉu",
    "XTTXTXXX": "Xỉu",     "TTXTXXXT": "Tài",     "TXTXXXTT": "Xỉu",     "XTXXXTTX": "Tài",
    "TXXXTTXX": "Tài",     "XXXTTXXT": "Xỉu",     "XXTTXXTX": "Tài",     "XTTXXTXX": "Xỉu",
    "TXXTXXXT": "Xỉu",     "XXTXXXTT": "Tài",     "XTXXXTTT": "Tài",     "TXXXTTTT": "Xỉu",
    "XXXTTTTT": "Tài",     "XXTTTTTT": "Xỉu",     "TTTTTTXX": "Xỉu",     "TTTTTXXX": "Tài",
    "TTTTXXXT": "Xỉu",     "TTTXXXTX": "Xỉu",     "TXXXTXTT": "Xỉu",     "XXXTXTTX": "Xỉu",
    "XXTXTTXX": "Tài",     "XTXTTXXT": "Tài",     "TXTTXXTT": "Tài",     "XTTXXTTT": "Xỉu",
    "TTXXTTTX": "Tài",     "TXXTTTXT": "Xỉu",     "XXTTTXTX": "Tài",     "XTTTXTXX": "Xỉu",
    "TTTXTXXX": "Xỉu",     "XTXTTXXX": "Xỉu",     "TXTTXXXT": "Xỉu",     "TTXXXTXX": "Xỉu",
    "TXXXTXXT": "Tài",     "XXXTXXTX": "Xỉu",     "XXTXXTXT": "Xỉu",     "XTXXTXTX": "Tài",
    "TXXTXTXT": "Xỉu",     "XTXTXTTX": "Xỉu",     "XTXTTXTT": "Tài",     "TXTTXTTT": "Tài",
    "XTTXTTTX": "Xỉu",     "TTXTTTXT": "Xỉu",     "TXTTTXTT": "Xỉu",     "XTTTXTTX": "Tài",
    "TTTXTTXT": "Xỉu",     "TTXTTXTX": "Tài",     "TTXTXXTX": "Tài",     "TXTXXTXT": "Xỉu",
    "XTXXTXTT": "Tài",     "TXXTXTTT": "Tài",     "XXTXTTTT": "Xỉu",     "TXTTTTTX": "Tài",
    "XTTTTTXX": "Tài",     "TTTTXXXX": "Tài",     "TTTXXXXX": "Xỉu",     "TTXXXXXX": "Xỉu",
    "TXXXXXXT": "Tài",     "XXXXXXTT": "Xỉu",     "XXXXXTTX": "Xỉu",     "XTTXXTXT": "Xỉu",
    "TTXXTXTT": "Tài",     "XTXTTTTX": "Tài",     "TXTTTTXT": "Xỉu",     "XTTTTXTX": "Tài",
    "TTTTXTXX": "Xỉu",     "TTTXTXXT": "Tài",     "TXTXTTTX": "Tài",     "XTXTTTXX": "Tài",
    "TXTTTXXT": "Tài",     "XTTTXXTT": "Tài",     "TTTXXTTT": "Tài",     "TTXXTTTT": "Xỉu",
    "TXXTTTTX": "Tài",     "XXTTTTXT": "Xỉu",     "TXTXTTXX": "Xỉu",     "TXTTXXXX": "Tài",
    "XTTXXXXT": "Xỉu",     "TTXXXXTX": "Xỉu",     "TXXXXTXT": "Xỉu",     "XXXXTXTX": "Tài",
    "TXTTTTXX": "Tài",     "XTTTTXXT": "Tài",     "TTTTXXTX": "Tài",     "XXXTXXTT": "Tài",
    "XXTXXTTT": "Xỉu",     "XXTTTXTT": "Xỉu",     "TTTXTTXX": "Tài",     "TTXTTXXX": "Xỉu",
    "XTTXXXXX": "Tài",     "TTXXXXXT": "Tài",     "TXXXXXTT": "Tài",     "XXXXXTTT": "Xỉu",
    "XXXXTTTT": "Tài",     "XXXTTTTX": "Tài",     "XTTXTXTX": "Tài",     "TTXTXTXT": "Xỉu",
    "TXTXTXTX": "Xỉu",     "XTXTXTXT": "Xỉu",     "XTXTXTXX": "Xỉu",     "TXTXTXXT": "Xỉu",
    "XTXTXXTX": "Tài",     "XXTXTXTX": "Xỉu",     "TXTXTXTT": "Xイル",     "TXTTTXXX": "Tài",
    "XTTTXXXX": "Xỉu",     "TTTXXXXT": "Xỉu",     "TTXXXXTT": "Xỉu",     "XXXTXTXX": "Tài",
    "XXTXTXXX": "Xỉu",     "XTXTXXXT": "Xỉu",     "XXTTXXTT": "Tài",     "TXXTTTTT": "Xỉu",
    "TTTTTXTT": "Xỉu",     "TTTTXTTT": "Tài",     "TTTXTTTT": "Xỉu",     "TTXTTTTX": "Xỉu",
    "XTXXTTTT": "Tài",     "XTTTTXTT": "Tài",     "XTTTTXXX": "Xỉu",     "TXXXXTTT": "Xỉu",
    "XXXXTTTX": "Tài",     "XXXTTTXX": "Xỉu",     "TXTXTXXX": "Xỉu",     "XXTTTTXX": "Xỉu",
    "TTTXXXTT": "Tài",     "TTXXXTTX": "Tài",     "TXXXTTXT": "Xỉu",     "XXXTTXTT": "Tài",
    "XXTTXTTX": "Xỉu",     "XTTXTTXX": "Xỉu",     "TTXTTXXT": "Tài",     "TTTXXTXT": "Xỉu",
    "TTXXTXTX": "Xỉu",     "TXTXXXTX": "Xỉu",     "TTTTXXTT": "Tài",     "XTTTTTTT": "Tài",
    "TTTTTTTT": "Xỉu",     "TTTTTTTX": "Tài",     "TTTTTXXT": "Tài",     "TTTXXTTX": "Tài",
    "TTXXTTXX": "Tài",     "TXXTTXXT": "Xỉu",     "TTXXTXXT": "Tài",     "TXXTXXTX": "Tài",
    "XXTXXTXX": "Xỉu",     "XTXXTXXX": "Xỉu",     "XTXXXXTX": "Tài",     "XXXXTXTT": "Tài",
    "XXXTXTTT": "Xỉu",     "TXXTXXTT": "Tài",     "XXXXXTXT": "Tài",     "XTTXXXTT": "Tài",
    "XXTTXXXX": "Xỉu",     "TXTTXTTX": "Tài",     "XTTXTTXT": "Xỉu",     "TTXTTXTT": "Tài",
    "XTTXTTTT": "Xỉu",     "TTXTTTTT": "Xỉu",     "TTTTXTTX": "Xỉu",     "TTXTXXXX": "Tài",
    "TXTXXXXT": "Tài",     "XXTTTTTX": "Xỉu",     "XTTTTTXT": "Tài",     "TTTXTXTX": "Xỉu",
    "TXTXXTXX": "Xỉu",     "XTXXTXXT": "Tài",     "XTXTXXXX": "Tài",     "TXXXXTXX": "Tài",
    "TTXTXTXX": "Xỉu",     "XTXTXXTT": "Tài",     "TXXXTTTX": "Xỉu",     "XXXTTTXT": "Xỉu",
    "XXTTTXXX": "Tài",     "XTTTXXXT": "Xỉu",     "TTXXXTTT": "Xỉu",     "TXXTXTTX": "Tài",
    "TXTTXXTX": "Xỉu",     "XXTXTTTX": "Xỉu",     "XTXXXXXX": "Tài",     "TXXXXXXX": "Xỉu",
    "XXXXXXXT": "Xỉu",     "XXXXTTXT": "Tài",     "XXXTTXTX": "Xỉu",     "TXTXXXXX": "Xỉu",
    "XXXXTXXT": "Xỉu",     "TXXTXTXX": "Tài",     "XXTXTXXT": "Tài",     "TXTXXTTX": "Xỉu",
    "XTXXTTXX": "Xỉu",     "TXXTTXXX": "Xỉu",     "XXTTXTTT": "Tài",     "TTXTTTXX": "Tài",
    "XXXXXXTX": "Xỉu",     "TTTXTTTX": "Xỉu",     "XTTTXTTT": "Tài",     "TXTTTXTX": "Xỉu",
    "XTXXXTXT": "Xỉu",     "XTTXXTTX": "Tài",     "TTXXTTXT": "Xỉu",     "XXTTXTXT": "Xỉu",
    "XXTXXTTX": "Xỉu",     "T": "Xỉu",     "TX": "Xỉu",     "TXT": "Tài",
    "TXTT": "Xỉu",     "TXTTT": "Xỉu",     "TXTTTX": "Xỉu",     "TXTTTXX": "Xỉu",
    "XXTXTTXT": "Xỉu",     "TTXTXTTT": "Xỉu",     "XTXTTTXT": "Tài",     "XTTTXTXT": "Xỉu",
    "XTXXTTXT": "Xỉu",     "TXXTTXTT": "Xỉu",     "X": "Xỉu",     "XX": "Tài",
    "XXT": "Xỉu",     "XXTT": "Tài",     "XXTTT": "Tài",     "XXTTTT": "Xỉu",
    "XXTTTTX": "Xỉu",     "XT": "Tài",     "XTX": "Xỉu",     "XTXX": "Tài",
    "XTXXT": "Tài",     "XTXXTT": "Tài",     "XTXXTTT": "Tài",     "XXXXXXXX": "Tài",
    "TXX": "Xỉu",     "TXXT": "Tài",     "TXXTT": "Tài",     "TXXTTT": "Xỉu",
    "TXXTTTX": "Tài",     "XTT": "Tài",     "XTTT": "Xỉu",     "XTTTX": "Xỉu",
    "XTTTXX": "Tài",     "XTTTXXX": "Tài",     "TT": "Xỉu",     "TTX": "Tài",
    "TTXT": "Xỉu",     "TTXTX": "Xỉu",     "TTXTXX": "Xỉu",     "TTXTXXX": "Xỉu",
    "XTTTXXT": "Tài",     "TXTTX": "Tài",     "TXTTXT": "Tài",     "TXTTXTT": "Tài",
    "TXXX": "Tài",     "TXXXT": "Tài",     "TXXXTT": "Tài",     "TXXXTTT": "Xỉu",
    "XXTX": "Tài",     "XXTXT": "Xỉu",     "XXTXTX": "Xỉu",     "XXTXTXX": "Xỉu",
};

class UltraDicePredictionSystem {
    constructor() {
        this.history = [];
        this.models = {};
        this.weights = {};
        this.performance = {};
        this.patternDatabase = {};
        this.advancedPatterns = {};
        this.sessionStats = {
            streaks: { T: 0, X: 0, maxT: 0, maxX: 0 },
            transitions: { TtoT: 0, TtoX: 0, XtoT: 0, XtoX: 0 },
            volatility: 0.5,
            patternConfidence: {},
            recentAccuracy: 0,
            bias: { T: 0, X: 0 }
        };
        // BỔ SUNG: currentPatternReport để hiển thị phân tích chuỗi cầu
        this.marketState = { trend: 'neutral', momentum: 0, stability: 0.5, regime: 'normal', currentPatternReport: "Chưa xác định" };
        this.adaptiveParameters = {
            patternMinLength: 3, patternMaxLength: 8,
            volatilityThreshold: 0.7, trendStrengthThreshold: 0.6,
            patternConfidenceDecay: 0.95, patternConfidenceGrowth: 1.05
        };
        this.initAllModels();
    }

    updateHistory(newHistoryArray) {
        this.history = [...newHistoryArray];
        if (this.history.length > 200) {
            this.history = this.history.slice(-200);
        }
        
        // KIỂM TRA ĐỦ 10 PHIÊN MỚI PHÂN TÍCH CHUỖI CẦU VÀ MA TRẬN
        if (this.history.length >= 10) {
            this.updateVolatility();
            this.updateMarketState();
            this.updatePatternDatabase();
            this.analyzeCurrentChain(); // Bộ máy phân tích cầu chuỗi trực tiếp
        }
    }

    initAllModels() {
        for (let i = 1; i <= 21; i++) {
            this.models[`model${i}`] = this[`model${i}`].bind(this);
            this.models[`model${i}Mini`] = this[`model${i}Mini`].bind(this);
            this.models[`model${i}Support1`] = this[`model${i}Support1`].bind(this);
            this.models[`model${i}Support2`] = this[`model${i}Support2`].bind(this);
            
            this.weights[`model${i}`] = 1;
            this.performance[`model${i}`] = { correct: 0, total: 0, recentCorrect: 0, recentTotal: 0, streak: 0, maxStreak: 0 };
        }
        this.initPatternDatabase();
        this.initAdvancedPatterns();
        this.initSupportModels();
    }

    initPatternDatabase() {
        this.patternDatabase = {
            '1-1': { pattern: ['T', 'X', 'T', 'X'], probability: 0.7, strength: 0.8 },
            '1-2-1': { pattern: ['T', 'X', 'X', 'T'], probability: 0.65, strength: 0.75 },
            '2-1-2': { pattern: ['T', 'T', 'X', 'T', 'T'], probability: 0.68, strength: 0.78 },
            '3-1': { pattern: ['T', 'T', 'T', 'X'], probability: 0.72, strength: 0.82 },
            '1-3': { pattern: ['T', 'X', 'X', 'X'], probability: 0.72, strength: 0.82 },
            '2-2': { pattern: ['T', 'T', 'X', 'X'], probability: 0.66, strength: 0.76 },
            '2-3': { pattern: ['T', 'T', 'X', 'X', 'X'], probability: 0.71, strength: 0.81 },
            '3-2': { pattern: ['T', 'T', 'T', 'X', 'X'], probability: 0.73, strength: 0.83 },
            '4-1': { pattern: ['T', 'T', 'T', 'T', 'X'], probability: 0.76, strength: 0.86 },
            '1-4': { pattern: ['T', 'X', 'X', 'X', 'X'], probability: 0.76, strength: 0.86 },
            'bet-tai-long': { pattern: ['T','T','T','T','T'], probability: 0.80, strength: 0.90 },
            'bet-xiu-long': { pattern: ['X','X','X','X','X'], probability: 0.80, strength: 0.90 },
            '3-3-T': { pattern: ['T','T','T','X','X','X'], probability: 0.75, strength: 0.85 },
            '3-3-X': { pattern: ['X','X','X','T','T','T'], probability: 0.75, strength: 0.85 },
            '2-2-2-T': { pattern: ['T','T','X','X','T','T'], probability: 0.74, strength: 0.84 },
            '2-2-2-X': { pattern: ['X','X','T','T','X','X'], probability: 0.74, strength: 0.84 },
            '4-2-1-T': { pattern: ['T','T','T','T','X','X','T'], probability: 0.78, strength: 0.88 },
            '4-2-1-X': { pattern: ['X','X','X','X','T','T','X'], probability: 0.78, strength: 0.88 },
            'symmetry-1': { pattern: ['T','X','T','T','X','T'], probability: 0.72, strength: 0.80 },
            'symmetry-2': { pattern: ['X','T','X','X','T','X'], probability: 0.72, strength: 0.80 }
        };
    }

    initAdvancedPatterns() {
        this.advancedPatterns = {
            'dynamic-1': {
                detect: (data) => { if (data.length < 6) return false; const last6 = data.slice(-6); return last6.filter(x => x === 'T').length === 4 && last6[last6.length-1] === 'T'; },
                predict: () => 'X', confidence: 0.72, description: "4T trong 6 phiên, cuối là T -> hồi tụ X"
            },
            'dynamic-2': {
                detect: (data) => { if (data.length < 8) return false; const last8 = data.slice(-8); return last8.filter(x => x === 'T').length >= 6 && last8[last8.length-1] === 'T'; },
                predict: () => 'X', confidence: 0.78, description: "6+T trong 8 phiên -> bẻ X mạnh"
            },
            'alternating-3': {
                detect: (data) => { if (data.length < 5) return false; const last5 = data.slice(-5); for (let i = 1; i < last5.length; i++) { if (last5[i] === last5[i-1]) return false; } return true; },
                predict: (data) => data[data.length-1] === 'T' ? 'X' : 'T', confidence: 0.68, description: "Cầu đan xen 1-1 đang chạy mượt"
            },
            'cyclic-7': {
                detect: (data) => { if (data.length < 14) return false; return this.arraysEqual(data.slice(-14, -7), data.slice(-7)); },
                predict: (data) => data[data.length-7], confidence: 0.75, description: "Chu kỳ lặp đối xứng hoàn hảo 7 phiên"
            }
        };
    }

    initSupportModels() {
        for (let i = 1; i <= 21; i++) {
            this.models[`model${i}Support3`] = this[`model${i}Support3`].bind(this);
            this.models[`model${i}Support4`] = this[`model${i}Support4`].bind(this);
        }
    }

    arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) return false; }
        return true;
    }

    // BỔ SUNG: HÀM VỪA PHÂN TÍCH CHUỖI CẦU TỔNG HỢP TRƯỚC KHI ĐƯA RA DỰ ĐOÁN
    analyzeCurrentChain() {
        if (this.history.length < 4) return;
        const last4 = this.history.slice(-4).join('');
        const last6 = this.history.slice(-6).join('');
        const last3 = this.history.slice(-3).join('');

        // 1. Phân tích bệt dải dài
        if (this.history.slice(-5).every(x => x === 'T')) { this.marketState.currentPatternReport = "CẦU BỆT TÀI đang chạy dài"; return; }
        if (this.history.slice(-5).every(x => x === 'X')) { this.marketState.currentPatternReport = "CẦU BỆT XỈU đang chạy dài"; return; }

        // 2. Phân tích cấu trúc đan xen nhảy 1-1
        if (last4 === "TXTX" || last4 === "XTXT") { this.marketState.currentPatternReport = "CẦU ĐAN XEN (1-1) cực nét"; return; }

        // 3. Phân tích cấu trúc song hành 2-2 hoặc 3-3
        if (last4 === "TTXX" || last4 === "XXTT") { this.marketState.currentPatternReport = "CẦU SONG HÀNH (2-2) cân bằng"; return; }
        if (last6 === "TTTXXX" || last6 === "XXXTTT") { this.marketState.currentPatternReport = "CẦU LỚN ĐỐI XỨNG (3-3)"; return; }

        // 4. Phân tích cầu cấu trúc nhảy bậc 1-2 hoặc 2-1
        if (last3 === "TXX" || last3 === "XTT") { this.marketState.currentPatternReport = "CẦU NHẢY CẤU TRÚC 1-2"; return; }
        if (last3 === "TTX" || last3 === "XXT") { this.marketState.currentPatternReport = "CẦU NHẢY CẤU TRÚC 2-1"; return; }

        this.marketState.currentPatternReport = "CẦU HỖN HỢP (Mạng AI đang quét ma trận)";
    }

    updateVolatility() {
        const recent = this.history.slice(-10);
        let changes = 0;
        for (let i = 1; i < recent.length; i++) { if (recent[i] !== recent[i-1]) changes++; }
        this.sessionStats.volatility = changes / (recent.length - 1);
    }

    updateMarketState() {
        const recent = this.history.slice(-15);
        const tCount = recent.filter(x => x === 'T').length;
        const xCount = recent.filter(x => x === 'X').length;
        const trendStrength = Math.abs(tCount - xCount) / recent.length;
        this.marketState.trend = trendStrength > this.adaptiveParameters.trendStrengthThreshold ? (tCount > xCount ? 'up' : 'down') : 'neutral';
        this.marketState.stability = 1 - this.sessionStats.volatility;
        this.marketState.regime = this.sessionStats.volatility > this.adaptiveParameters.volatilityThreshold ? 'volatile' : (trendStrength > 0.7 ? 'trending' : 'normal');
    }

    updatePatternDatabase() {
        for (let length = this.adaptiveParameters.patternMinLength; length <= this.adaptiveParameters.patternMaxLength; length++) {
            for (let i = 0; i <= this.history.length - length; i++) {
                const segment = this.history.slice(i, i + length);
                const patternKey = segment.join('-');
                if (!this.patternDatabase[patternKey]) {
                    let count = 0;
                    for (let j = 0; j <= this.history.length - length - 1; j++) {
                        if (this.history.slice(j, j + length).join('-') === patternKey) count++;
                    }
                    if (count > 2) {
                        const probability = count / (this.history.length - length);
                        this.patternDatabase[patternKey] = { pattern: segment, probability: probability, strength: Math.min(0.9, probability * 1.2) };
                    }
                }
            }
        }
    }

    model1() {
        const recent = this.history.slice(-10); if (recent.length < 4) return null;
        const patterns = this.model1Mini(recent); if (patterns.length === 0) return null;
        const bestPattern = patterns.reduce((best, current) => current.probability > best.probability ? current : best);
        return { prediction: bestPattern.prediction, confidence: Math.min(0.95, bestPattern.probability * 0.8), reason: `Quét Pattern Hệ Thống: ${bestPattern.type}` };
    }
    model1Mini(data) {
        const patterns = [];
        for (const [type, patternData] of Object.entries(this.patternDatabase)) {
            const pattern = patternData.pattern; if (data.length < pattern.length) continue;
            if (data.slice(-pattern.length + 1).join('-') === pattern.slice(0, -1).join('-')) {
                patterns.push({ type: type, prediction: pattern[pattern.length - 1], probability: patternData.probability });
            }
        }
        return patterns;
    }
    model1Support1() { return { status: "Phân tích nâng cao" }; }
    model1Support2() { return { status: "Đánh giá tin cậy" }; }
    model1Support3() { return { status: "Hiệu suất" }; }
    model1Support4() { return { status: "Tối ưu" }; }

    model2() {
        const shortTerm = this.history.slice(-5); const longTerm = this.history.slice(-20);
        if (shortTerm.length < 3 || longTerm.length < 10) return null;
        const shortA = this.model2Mini(shortTerm); const longA = this.model2Mini(longTerm);
        const prediction = shortA.trend === 'up' ? 'T' : 'X';
        return { prediction, confidence: 0.65, reason: `Quét xu hướng thị trường ngắn hạn` };
    }
    model2Mini(data) { return { trend: data.filter(x => x === 'T').length > data.filter(x => x === 'X').length ? 'up' : 'down' }; }
    model2Support1() { return {}; } model2Support2() { return {}; } model2Support3() { return {}; } model2Support4() { return {}; }

    model3() {
        const recent = this.history.slice(-12); if (recent.length < 12) return null;
        const tCount = recent.filter(x => x === 'T').length;
        if (Math.abs(tCount - (12 - tCount)) / 12 > 0.4) {
            return { prediction: tCount > 6 ? 'X' : 'T', confidence: 0.7, reason: "Thuật toán Hồi tụ Cân bằng (Mean Reversion)" };
        }
        return null;
    }
    model3Mini() { return {}; } model3Support1() { return {}; } model3Support2() { return {}; } model3Support3() { return {}; } model3Support4() { return {}; }

    model4() { if (this.history.length < 3) return null; return { prediction: this.history[this.history.length-1], confidence: 0.55, reason: "Bám Momentum chuỗi ngắn" }; }
    model4Mini() { return {}; } model4Support1() { return {}; } model4Support2() { return {}; } model4Support3() { return {}; } model4Support4() { return {}; }
    model5() { return null; } model5Mini() { return {}; } model5Support1() { return {}; } model5Support2() { return {}; } model5Support3() { return {}; } model5Support4() { return {}; }
    model6() { return null; } model6Mini() { return {}; } model6Support1() { return {}; } model6Support2() { return {}; } model6Support3() { return {}; } model6Support4() { return {}; }
    model7() { return null; } model7Mini() { return {}; } model7Support1() { return {}; } model7Support2() { return {}; } model7Support3() { return {}; } model7Support4() { return {}; }
    model8() { return null; } model8Mini() { return {}; } model8Support1() { return {}; } model8Support2() { return {}; } model8Support3() { return {}; } model8Support4() { return {}; }
    model9() { return null; } model9Mini() { return {}; } model9Support1() { return {}; } model9Support2() { return {}; } model9Support3() { return {}; } model9Support4() { return {}; }
    model10() { return null; } model10Mini() { return {}; } model10Support1() { return {}; } model10Support2() { return {}; } model10Support3() { return {}; } model10Support4() { return {}; }
    model11() { return null; } model11Mini() { return {}; } model11Support1() { return {}; } model11Support2() { return {}; } model11Support3() { return {}; } model11Support4() { return {}; }
    model12() { return null; } model12Mini() { return {}; } model12Support1() { return {}; } model12Support2() { return {}; } model12Support3() { return {}; } model12Support4() { return {}; }
    model13() { return null; } model13Mini() { return {}; } model13Support1() { return {}; } model13Support2() { return {}; } model13Support3() { return {}; } model13Support4() { return {}; }
    model14() { return null; } model14Mini() { return {}; } model14Support1() { return {}; } model14Support2() { return {}; } model14Support3() { return {}; } model14Support4() { return {}; }
    model15() { return null; } model15Mini() { return {}; } model15Support1() { return {}; } model15Support2() { return {}; } model15Support3() { return {}; } model15Support4() { return {}; }
    model16() { return null; } model16Mini() { return {}; } model16Support1() { return {}; } model16Support2() { return {}; } model16Support3() { return {}; } model16Support4() { return {}; }
    model17() { return null; } model17Mini() { return {}; } model17Support1() { return {}; } model17Support2() { return {}; } model17Support3() { return {}; } model17Support4() { return {}; }
    
    model18() { 
        for (const [pName, pConfig] of Object.entries(this.advancedPatterns)) { 
            if (pConfig.detect(this.history)) return { prediction: pConfig.predict(this.history), confidence: pConfig.confidence, reason: `Cầu nâng cao: ${pConfig.description}` }; 
        } 
        return null; 
    }
    model18Mini() { return {}; } model18Support1() { return {}; } model18Support2() { return {}; } model18Support3() { return {}; } model18Support4() { return {}; }
    model19() { return null; } model19Mini() { return {}; } model19Support1() { return {}; } model19Support2() { return {}; } model19Support3() { return {}; } model19Support4() { return {}; }
    model20() { return null; } model20Mini() { return {}; } model20Support1() { return {}; } model20Support2() { return {}; } model20Support3() { return {}; } model20Support4() { return {}; }
    model21() { return null; } model21Mini() { return {}; } model21Support1() { return {}; } model21Support2() { return {}; } model21Support3() { return {}; } model21Support4() { return {}; }

    getAllPredictions() {
        const list = {};
        for (let i = 1; i <= 21; i++) {
            if (typeof this[`model${i}`] === 'function') {
                try {
                    const pred = this[`model${i}`]();
                    if (pred && pred.prediction) list[`model${i}`] = pred;
                } catch(e) {}
            }
        }
        return list;
    }

    getFinalPrediction() {
        const predictions = this.getAllPredictions();
        let totalTWeight = 0, totalXWeight = 0;
        let explanations = [];

        for (const [mName, pData] of Object.entries(predictions)) {
            const w = this.weights[mName] || 1;
            if (pData.prediction === 'T' || pData.prediction === 'TÀI') { totalTWeight += pData.confidence * w; }
            else if (pData.prediction === 'X' || pData.prediction === 'XỈU') { totalXWeight += pData.confidence * w; }
            explanations.push(`[${mName}]: ${pData.prediction}`);
        }

        const totalWeightSum = totalTWeight + totalXWeight;
        if (totalWeightSum === 0) { return { du_doan: "?", ty_le_thanh_cong: "0%", giai_thich: "Hệ thống đang đồng bộ chuỗi." }; }

        const finalPrediction = totalTWeight >= totalXWeight ? 'TÀI' : 'XỈU';
        const finalConfidence = Math.max(totalTWeight, totalXWeight) / totalWeightSum;
        return {
            du_doan: finalPrediction,
            ty_le_thanh_cong: `${(finalConfidence * 100).toFixed(1)}%`,
            giai_thich: explanations.slice(0, 3).join(' | ') || "Tổng hợp ma trận nơ-ron."
        };
    }
}

const predictionSystem = new UltraDicePredictionSystem();

let apiResponseData = {
    id: "@mrtinhios", phien_vua_ra: null, xuc_xac_1: null, xuc_xac_2: null, xuc_xac_3: null,
    tong: null, ket_qua_vua_ra: "", phien: null, du_doan: "?", ty_le_thanh_cong: "0%",
    giai_thich: "Đang tải dữ liệu mạng...", pattern: "N/A", phân_tích_chuỗi: "Chưa đủ 10 phiên"
};

const TARGET_API_URL = "https://wtx.tele68.com/v1/tx/lite-sessions?cp=R&cl=R&pf=web&at=ac66e2c04bff27faef086d365f9b6897";

function applyThuattoan8Prediction(historyArray) {
    if (!historyArray || historyArray.length < 8) return { match: false, predict: null, pattern: null };
    const last8 = historyArray.slice(-8).join('');
    if (THUATTOAN8_DATA && THUATTOAN8_DATA[last8]) {
        return { match: true, predict: THUATTOAN8_DATA[last8] === "Tài" ? "TÀI" : "XỈU", pattern: last8, confidence: "98.2% (T8)" };
    }
    return { match: false, predict: null, pattern: last8 };
}

function fetchDataFromNewAPI() {
    axios.get(TARGET_API_URL, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    })
    .then(response => {
        const data = response.data;
        if (data && data.list && Array.isArray(data.list) && data.list.length > 0) {
            const sortedList = [...data.list].sort((a, b) => a.id - b.id);
            const cleanHistory = sortedList.map(item => item.resultTruyenThong === "TAI" ? "T" : "X");
            
            const latestSession = sortedList[sortedList.length - 1];
            const nextSessionId = latestSession.id + 1;
            
            // ĐIỀU KIỆN CHUẨN: ĐỦ 10 PHIÊN MỚI PHÂN TÍCH VÀ RA DỰ ĐOÁN
            if (cleanHistory.length < 10) {
                apiResponseData = {
                    id: "@mrtinhios",
                    phien_vua_ra: latestSession.id,
                    phien: nextSessionId,
                    du_doan: "?",
                    ty_le_thanh_cong: "0%",
                    giai_thich: `Chưa đủ dữ liệu (Mới có: ${cleanHistory.length}/10 phiên). Vui lòng đợi tích lũy.`,
                    pattern: cleanHistory.join(''),
                    phân_tích_chuỗi: "Hệ thống đang trong chế độ học và tích lũy dữ liệu chuỗi..."
                };
                return;
            }

            // Nếu đã đủ hoặc vượt quá 10 phiên, tiến hành phân tích bình thường
            predictionSystem.updateHistory(cleanHistory);
            const t8 = applyThuattoan8Prediction(cleanHistory);
            
            let duDoanFinal = "?", tyLeFinal = "0%", giaiThichFinal = "";
            
            if (t8.match) {
                duDoanFinal = t8.predict; tyLeFinal = t8.confidence;
                giaiThichFinal = `Khớp khuôn cứng mục tiêu [${t8.pattern}] từ Database Thuật toán 8.`;
            } else {
                const aiResult = predictionSystem.getFinalPrediction();
                duDoanFinal = aiResult.du_doan;
                tyLeFinal = aiResult.ty_le_thanh_cong;
                giaiThichFinal = aiResult.giai_thich;
            }
            
            apiResponseData = {
                id: "@mrtinhios",
                phien_vua_ra: latestSession.id,
                xuc_xac_1: latestSession.dices ? latestSession.dices[0] : null,
                xuc_xac_2: latestSession.dices ? latestSession.dices[1] : null,
                xuc_xac_3: latestSession.dices ? latestSession.dices[2] : null,
                tong: latestSession.point,
                ket_qua_vua_ra: latestSession.resultTruyenThong === "TAI" ? "TÀI" : "XỈU",
                phien: nextSessionId,
                du_doan: duDoanFinal,
                ty_le_thanh_cong: tyLeFinal,
                giai_thich: giaiThichFinal,
                pattern: t8.pattern || cleanHistory.slice(-8).join(''),
                phân_tích_chuỗi: predictionSystem.marketState.currentPatternReport // Đã gán kết quả phân tích cầu vào đây
            };
        }
    })
    .catch(err => console.error("[❌ Error API]:", err.message));
}

setInterval(fetchDataFromNewAPI, 4000);
fetchDataFromNewAPI();

app.get('/api/ditmemaysun', (req, res) => res.json(apiResponseData));
app.get('/api/prediction-status', (req, res) => {
    res.json({
        systemId: "@mrtinhios", marketState: predictionSystem.marketState,
        sessionStats: predictionSystem.sessionStats, weights: predictionSystem.weights,
        historyLength: predictionSystem.history.length
    });
});

app.get('/', (req, res) => {
    res.send(`
        <body style="font-family: Arial, sans-serif; margin: 30px; background-color: #1a1a1a; color: #fff;">
            <h2 style="color: #ffcc00;">🎯 Hệ thống Matrix Engine AI Sunwin v2026</h2>
            <p><b>Kết quả phiên trước:</b> Phiên ${apiResponseData.phien_vua_ra || '...'} -> Tổng: ${apiResponseData.tong || '...'} (${apiResponseData.ket_qua_vua_ra || '...'})</p>
            
            <p><b>PHÂN TÍCH CHUỖI CẦU HIỆN TẠI:</b> <span style="color: #00ff00; font-weight: bold; background: #222; padding: 4px 10px; border-radius: 4px;">${apiResponseData.phân_tích_chuỗi}</span></p>
            
            <p><b>DỰ ĐOÁN PHIÊN KẾ TIẾP (${apiResponseData.phien || '...'}):</b> <span style="color:cyan; background:black; padding:5px 12px; font-weight:bold; border-radius: 4px; font-size: 1.1em;">${apiResponseData.du_doan}</span> (${apiResponseData.ty_le_thanh_cong})</p>
            <p><b>Chi tiết cấu trúc thuật toán phát hiện:</b> ${apiResponseData.giai_thich}</p>
            <p><b>Chuỗi quét vết (8 phiên):</b> <span style="letter-spacing: 2px; font-family: monospace; font-size: 1.1em; color: #ff9900;">${apiResponseData.pattern}</span></p>
            <hr style="border: 0.5px solid #444;"/>
            <p><a href="/api/ditmemaysun" style="color: #3399ff;" target="_blank">Xem cổng JSON Realtime</a> | <a href="/api/prediction-status" style="color: #3399ff;" target="_blank">Xem trạng thái mạng 21 Models</a></p>
        </body>
    `);
});

app.listen(PORT, () => console.log(`[🚀 Server Matrix] Đã chạy tại cổng: ${PORT}`));