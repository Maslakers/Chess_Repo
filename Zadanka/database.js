function database(id)
{
    let fen;
    switch (id)
    {
        case 0: fen="r1bqr1k1/1pp2Npp/p1np4/2n1p3/1b2P3/1QNPB3/PPP1BPPP/2KR3R w"; movesWhite = [6786, 2378, 8667]; movesBlack = [7888, 5878]; break;
        case 1: fen="3q4/7k/1p5r/1PnpNp2/2p5/6P1/PKPQ3P/6R1 w"; movesWhite = [4286, 5567, 6748]; movesBlack = [8786, 8677]; break;
        case 2: fen="2n5/p2b3p/2p1k1r1/N3np2/P2Qp3/2P1P3/1q2B2P/3RKN2 w"; movesWhite = [4455, 1534, 3422]; movesBlack = [5655, 5556]; break;
        case 3: fen="r3r1k1/p2q3p/1p4p1/8/3pN1n1/PP1P4/6PP/R2QR2K w"; movesWhite = [4174, 5466, 6674]; movesBlack = [4774, 7877]; break;
        case 4: fen="2r2b2/1p3p1k/7p/1P5q/3BNPn1/1P4Q1/3R2P1/2r2RK1 w"; break;
        case 5: fen="2kr2nr/pppb2pp/3q4/2p1N1Q1/4P3/2P5/2P2PPP/1RB1K2R w"; break;
        case 6: fen="6k1/6n1/3N1Q2/BppP2Pb/2p1K3/2P3q1/8/8 w"; break;
        case 7: fen="4r1k1/1bbN1p2/p5pp/2p4q/P1B3nP/2P1P1P1/2N2P2/3Q1RK1 w"; break;
        case 8: fen="8/2Q5/5pkp/1p3bp1/3q1P2/KP2N1P1/P3R3/1r6 w"; break;
        case 9: fen="1b1n2k1/1p3ppp/8/3N1n1q/1PB5/2P2N2/6PP/1Q5K w"; break;
        case 10: fen="8/1b4k1/p2rq2p/2p3p1/8/2P1N1QP/1PR2P2/6K1 w"; break;
        case 11: fen="1Q6/2r3pk/6bp/3pq3/p4N2/2P3P1/PP6/K1R5 w"; break;
        case 12: fen="2r3k1/3R2p1/3pr3/1p1b2np/1P1p3q/3P2NP/3Q1PPK/4RB2 w"; break;
        case 13: fen="r2q4/1p3p1k/3p1b1p/3N4/2p5/P4P2/1PP3QP/K3R3 w"; break;
        case 14: fen="1rr3k1/pb2qp1p/4nbp1/p3p3/2B1N3/PP3PPP/1B2PQ2/R2R3K w"; break;
        case 15: fen="3r1rk1/pbp4p/1p1bn3/4pNp1/2P1P3/P5Pq/1B2BP1P/1QR1B1K1 w"; break;
        case 16: fen="3n4/pp3p2/4k2p/1PP1p3/4NP2/Pb2K3/6BP/8 w"; break;
        case 17: fen="r3r2k/1p1q1p1p/4nP2/2pp3N/6Q1/2P4R/PPK3PP/7R w"; break;
        case 18: fen="2r1k2r/3b1pb1/p2ppp2/2q2P2/2p1P2p/P1N2N2/1PP1Q1PP/3R1R1K w"; break;
        case 19: fen="4br2/p1q1p1k1/4Q1p1/1pN2n2/1P1b4/8/P3B1PP/4BR1K w"; break;
        case 20: fen="2r1n2k/5Qp1/pn5p/1p2N1q1/4Rp2/P2R1P1P/2r3P1/5BK1 w"; break;
        case 21: fen="r3r2k/p6p/4p1p1/1Q1pN3/3Pn2q/2P5/PP4P1/1K1RR3 w"; break;
        case 22: fen= '5b1r/p2k1ppp/b2p1P2/2p5/P1p2P2/3qQN2/5KPP/1RR5 w';break;
    }
    generatePieces(fen);
    return fen;
}