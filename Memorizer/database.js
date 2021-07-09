let correctFiles = [];
function database()
{
    let id = Math.floor(Math.random()*11);
    console.log("loading Puzzle with id: "+id)
    switch (id)
    {
        case 0: generatePieces("r1bqr1k1/1pp2Npp/p1np4/2n1p3/1b2P3/1QNPB3/PPP1BPPP/2KR3R w"); correctFiles=[24, 35, 55, 46, 48]; break;
        case 1: generatePieces("2r3k1/3R2p1/3pr3/1p1b2np/1P1p3q/3P2NP/3Q1PPK/4RB2 w"); correctFiles=[77, 46, 85, 56, 75]; break;
        case 2: generatePieces("1rr3k1/pb2qp1p/4nbp1/p3p3/2B1N3/PP3PPP/1B2PQ2/R2R3K w"); correctFiles=[17, 56, 66, 55]; break;
        case 3: generatePieces("1r3rk1/ppP2pbp/q3bnp1/6P1/3N1p2/2N2P2/PPPQ3P/2KR1B1R w"); correctFiles=[28, 16, 56, 66, 64]; break;
        case 4: generatePieces("r2qk2r/ppp2ppp/2n1b3/2bnN3/8/2N3P1/PP1PPPBP/R1BQ1RK1 w"); correctFiles=[36, 67, 45]; break;
        case 5: generatePieces("rn2kb1r/p1p1qppp/8/Qp1n4/2b5/5N2/PP1PBPPP/RNB1K2R w"); correctFiles=[17, 25, 37]; break;
        case 6: generatePieces("r2qkb1r/1p1bpppp/p1np4/8/B2NP1n1/2N1B3/PPP2PPP/R2QK2R w"); correctFiles=[36, 74]; break;
        case 7: generatePieces("1r1qkb1r/3b1ppp/p1pp4/4p3/B3P1n1/2N3B1/PPP2PPP/R2QK2R w"); correctFiles=[36, 46, 55, 74]; break;
        case 8: generatePieces("r1bqr1k1/1pp3pp/1pn5/3p1p1Q/3P1B2/2PB4/P1P2PPP/R4RK1 w"); correctFiles=[37, 58, 65, 87]; break;
        case 9: generatePieces("7k/1p1bQ1qp/8/2p2p2/2B3P1/7P/r1P2P2/4R1K1 w"); correctFiles=[12, 35, 47, 77]; break;
        case 10: generatePieces("r2q1rk1/1bp1bpp1/p1np1n1p/1p2p1B1/3PP3/1BP2N2/PP3PPP/RN1QR1K1 w"); correctFiles=[86, 67, 66, 55]; break;
    }
}