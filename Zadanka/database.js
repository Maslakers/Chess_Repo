let completedPuzzles = [];
function database()
{
    let id = Math.floor(Math.random()*25);
    if(completedPuzzles.length == 11) console.log("ukończono wszystkie zadania"); else
    for(let i=0; i<completedPuzzles.length; i++)
    {
        if(completedPuzzles[i] == id) 
        {
            id = (id+1)%11;
            i=-1;
        }
    }
    console.log('loading Puzzle with Id:'+id)
    completedPuzzles.push(id);
    switch (id)
    {
        case 0: fen="r1bqr1k1/1pp2Npp/p1np4/2n1p3/1b2P3/1QNPB3/PPP1BPPP/2KR3R w"; solverMoves = [6786, 2378, 8667]; opponentMoves = [7888, 5878]; break;
        case 1: fen="3q4/7k/1p5r/1PnpNp2/2p5/6P1/PKPQ3P/6R1 w"; solverMoves = [4286, 5567, 6748]; opponentMoves = [8786, 8677]; break;
        case 2: fen="2n5/p2b3p/2p1k1r1/N3np2/P2Qp3/2P1P3/1q2B2P/3RKN2 w"; solverMoves = [4455, 1534, 3422]; opponentMoves = [5655, 5556]; break;
        case 3: fen="r3r1k1/p2q3p/1p4p1/8/3pN1n1/PP1P4/6PP/R2QR2K w"; solverMoves = [4174, 5466, 6674]; opponentMoves = [4774, 7877]; break;
        case 4: fen="2r2b2/1p3p1k/7p/1P5q/3BNPn1/1P4Q1/3R2P1/2r2RK1 w"; solverMoves = [7374, 7161, 6162, 5466, 6674]; opponentMoves = [3161, 3831, 8574, 8788]; break;
        case 5: fen="Q7/p1p1q1pk/3p2rp/4n3/3bP3/7b/PP3PPK/R1B2R2 b"; solverMoves = [1627, 1211, 4224, 4436]; opponentMoves = [8111, 6824, 3858]; break;
        case 6: fen="4r3/p4pkp/q7/3Bbb2/P2P1ppP/2N3n1/1PP2KPR/R1BQ4 b"; solverMoves = [8338, 4455, 4146, 4647]; opponentMoves = [5838, 6846, 3856]; break;
        case 7: fen="8/6pk/3pp2p/4p1nP/1P2P3/3P1rP1/4qPK1/2QN3R b"; solverMoves = [3626, 4736, 3616, 2436]; opponentMoves = [2726, 2617, 1728]; break;
        case 8: fen="2k4r/ppp2p2/2b2B2/7p/6pP/2P1q1bP/PP3N2/R4QK1 b"; solverMoves = [2617, 4635, 3526, 2627] ; opponentMoves = [2817, 1728, 3827]; break;
        case 9: fen="2rr1k2/5pp1/p2bp3/1p1B4/1PnP2Pq/P1B2P2/2Q1N1P1/R3R1K1 b"; solverMoves = [5317, 1726, 1517, 6546]; opponentMoves = [2818, 1828, 2838]; break;
        case 10: fen="8/k2r4/p7/2b1Bp2/P3p3/qp4R1/4QP2/1K6 b"; solverMoves = [5258, 8687, 6486, 8777]; opponentMoves = [4758, 7868, 4477]; break;
        case 11: fen="1Q6/2r3pk/6bp/3pq3/p4N2/2P3P1/PP6/K1R5 w"; solverMoves = [2888, 6476, 7655 ]; opponentMoves = [8788, 8878]; break;
        case 12: fen="2r3k1/3R2p1/3pr3/1p1b2np/1P1p3q/3P2NP/3Q1PPK/4RB2 w"; solverMoves = [4777, 7365, 6584]; opponentMoves = [7877, 7767]; break;
        case 13: fen="r2q4/1p3p1k/3p1b1p/3N4/2p5/P4P2/1PP3QP/K3R3 w"; solverMoves = [5158, 4566, 6658]; opponentMoves = [4858, 8788]; break;
        case 14: fen="r2q4/1p3p1k/3p1b1p/3N4/2p5/P4P2/1PP3QP/K3R3 b"; solverMoves = [8186,8688,5184,8448]; opponentMoves = [8878,7888,8878]; break;
        case 15: fen="3r1rk1/pbp4p/1p1bn3/4pNp1/2P1P3/P5Pq/1B2BP1P/1QR1B1K1 w"; solverMoves = [5274, 6586, 8674]; opponentMoves = [8374, 7888]; break;
        case 16: fen="3n4/pp3p2/4k2p/1PP1p3/4NP2/Pb2K3/6BP/8 w"; solverMoves = [3536, 5435, 3523]; opponentMoves = [2736,5657]; break;
        case 17: fen="r3r2k/1p1q1p1p/4nP2/2pp3N/6Q1/2P4R/PPK3PP/7R w"; solverMoves = [7477, 6677, 8566, 6647]; opponentMoves = [5677, 8878, 7877]; break;
        case 18: fen="2r1k2r/3b1pb1/p2ppp2/2q2P2/2p1P2p/P1N2N2/1PP1Q1PP/3R1R1K w"; solverMoves = [5455, 3354, 5446]; opponentMoves = [4655, 3536]; break;
        case 19: fen="4br2/p1q1p1k1/4Q1p1/1pN2n2/1P1b4/8/P3B1PP/4BR1K b"; solverMoves = [6217, 3111, 1114, 1415]; opponentMoves = [1817, 4714, 4815]; break;
        case 20: fen="2r1n2k/5Qp1/pn5p/1p2N1q1/4Rp2/P2R1P1P/2r3P1/5BK1 b"; solverMoves = [6727, 6168, 2426, 2627]; opponentMoves = [3827, 2837, 3747]; break;
        case 21: fen="r3r2k/p6p/4p1p1/1Q1pN3/3Pn2q/2P5/PP4P1/1K1RR3 b"; solverMoves = [4566, 8171, 4171]; opponentMoves = [7766, 7471]; break;
        case 22: fen='1r2k1r1/pbppnp1p/1b3P2/8/Q7/B1PB1q2/P4PPP/3R2K1 w'; solverMoves = [1447, 4365, 6547, 1357]; opponentMoves = [5847, 4758, 5848]; break;
        case 23: fen='r1bqr3/ppp1B1kp/1b4p1/n2B4/3PQ1P1/2P5/P4P2/RN4K1 w'; solverMoves = [5455, 7475, 4563, 5573]; opponentMoves = [7786, 8685, 8584]; break;
        case 24: fen='r1b3kr/3pR1p1/ppq4p/5P2/4Q3/B7/P5PP/5RK1 w'; solverMoves = [5777, 5457, 5768, 6867]; opponentMoves = [7877, 7778, 7887]; break;
    }
    generatePieces(fen);
}