let turn2, q, ref, currentMove, re_game, board, godMode;
export function brain_of_comp(booard, nth_move, gait, pattern, mode) {
	godMode = mode;
	board = booard;
	q = nth_move;
	ref = gait;
	currentMove = q % 2 == 0 ? 'O' : 'X';
	re_game = pattern;
	turn2 = 0
	wining_move(board);
	if (turn2 == 0) {
		stop_opp(board);
	}
	if (godMode) {
		if (turn2 == 0) {
			skill_n1(board);
		}
		if (q == 4 && turn2 == 0) {
			skill_n2(board);
		}
		if (q == 4 && turn2 == 0) {
			skill_n3(board);
		}
		if (turn2 == 0 && ref != 1 && re_game == 2) {
			skill_n4(board);
		}
		if ((ref != 5 || ref != 1 || re_game == 1) && turn2 == 0) {
			skill_n5(board);
		}
		if ((ref == 1 || ref == 5 || re_game == 0) && turn2 == 0) {
			skill_n6(board);
		}
	}
	if (turn2 == 0) {
		console.log("Random Move"); // For debugging purposes
		turn2 = randomMove(board);
	}
	return turn2;
}
export function wining_move(board) {
	let _tm, sep;
	sep = q;
	let sym = sep % 2 == 1 ? 'X' : 'O';
	if ((((board[9] == 'X' && board[5] == 'X') || (board[9] == 'O' && board[5] == 'O')
		|| (board[7] == 'X' && board[4] == 'X') || (board[7] == 'O' && board[4] == 'O')
		|| (board[3] == 'X' && board[2] == 'X') || (board[3] == 'O' && board[2] == 'O')) && board[1] == ' ')
		|| (((board[1] == 'X' && board[3] == 'X') || (board[1] == 'O' && board[3] == 'O')
			|| (board[8] == 'X' && board[5] == 'X') || (board[8] == 'O' && board[5] == 'O')) && board[2] == ' ')
		|| (((board[7] == 'X' && board[5] == 'X') || (board[7] == 'O' && board[5] == 'O')
			|| (board[1] == 'X' && board[2] == 'X') || (board[1] == 'O' && board[2] == 'O')
			|| (board[9] == 'X' && board[6] == 'X') || (board[9] == 'O' && board[6] == 'O')) && board[3] == ' ')
		|| (((board[1] == 'X' && board[7] == 'X') || (board[1] == 'O' && board[7] == 'O')
			|| (board[5] == 'X' && board[6] == 'X') || (board[5] == 'O' && board[6] == 'O')) && board[4] == ' ')
		|| (((board[1] == 'X' && board[9] == 'X') || (board[1] == 'O' && board[9] == 'O')
			|| (board[8] == 'X' && board[2] == 'X') || (board[8] == 'O' && board[2] == 'O')
			|| (board[4] == 'X' && board[6] == 'X') || (board[4] == 'O' && board[6] == 'O')
			|| (board[7] == 'X' && board[3] == 'X') || (board[7] == 'O' && board[3] == 'O')) && board[5] == ' ')
		|| (((board[4] == 'X' && board[5] == 'X') || (board[4] == 'O' && board[5] == 'O')
			|| (board[9] == 'X' && board[3] == 'X') || (board[9] == 'O' && board[3] == 'O')) && board[6] == ' ')
		|| (((board[3] == 'X' && board[5] == 'X') || (board[3] == 'O' && board[5] == 'O')
			|| (board[1] == 'X' && board[4] == 'X') || (board[1] == 'O' && board[4] == 'O')
			|| (board[9] == 'X' && board[8] == 'X') || (board[9] == 'O' && board[8] == 'O')) && board[7] == ' ')
		|| (((board[5] == 'X' && board[2] == 'X') || (board[5] == 'O' && board[2] == 'O')
			|| (board[9] == 'X' && board[7] == 'X') || (board[9] == 'O' && board[7] == 'O')) && board[8] == ' ')
		|| (((board[1] == 'X' && board[5] == 'X') || (board[1] == 'O' && board[5] == 'O')
			|| (board[7] == 'X' && board[8] == 'X') || (board[7] == 'O' && board[8] == 'O')
			|| (board[3] == 'X' && board[6] == 'X') || (board[3] == 'O' && board[6] == 'O')) && board[9] == ' ')) {
		for (_tm = 1; _tm <= 9; _tm++) {
			if (board[_tm] == ' ') {
				board[_tm] = sym;
				if (checkwin(sym)) {
					board[_tm] = ' ';
					turn2 = _tm;
					break;
				}
				else {
					board[_tm] = ' ';
					turn2 = 0;
				}
			}
		}
	}
}
export function stop_opp(board) {
	if (((board[9] == 'X' && board[5] == 'X') || (board[9] == 'O' && board[5] == 'O')
		|| (board[7] == 'X' && board[4] == 'X') || (board[7] == 'O' && board[4] == 'O')
		|| (board[3] == 'X' && board[2] == 'X') || (board[3] == 'O' && board[2] == 'O')) && board[1] == ' ') {
		turn2 = 1;

	}
	else if (((board[1] == 'X' && board[3] == 'X') || (board[1] == 'O' && board[3] == 'O')
		|| (board[8] == 'X' && board[5] == 'X') || (board[8] == 'O' && board[5] == 'O')) && (board[2] == ' ')) {
		turn2 = 2;
	}
	else if (((board[7] == 'X' && board[5] == 'X') || (board[7] == 'O' && board[5] == 'O')
		|| (board[1] == 'X' && board[2] == 'X') || (board[1] == 'O' && board[2] == 'O')
		|| (board[9] == 'X' && board[6] == 'X') || (board[9] == 'O' && board[6] == 'O')) && (board[3] == ' ')) {
		turn2 = 3;
	}
	else if (((board[1] == 'X' && board[7] == 'X') || (board[1] == 'O' && board[7] == 'O')
		|| (board[5] == 'X' && board[6] == 'X') || (board[5] == 'O' && board[6] == 'O')) && (board[4] == ' ')) {
		turn2 = 4;
	}
	else if (((board[1] == 'X' && board[9] == 'X') || (board[1] == 'O' && board[9] == 'O')
		|| (board[8] == 'X' && board[2] == 'X') || (board[8] == 'O' && board[2] == 'O')
		|| (board[4] == 'X' && board[6] == 'X') || (board[4] == 'O' && board[6] == 'O')
		|| (board[7] == 'X' && board[3] == 'X') || (board[7] == 'O' && board[3] == 'O')) && (board[5] == ' ')) {
		turn2 = 5;
	}
	else if (((board[4] == 'X' && board[5] == 'X') || (board[4] == 'O' && board[5] == 'O')
		|| (board[9] == 'X' && board[3] == 'X') || (board[9] == 'O' && board[3] == 'O')) && (board[6] == ' ')) {
		turn2 = 6;
	}
	else if (((board[3] == 'X' && board[5] == 'X') || (board[3] == 'O' && board[5] == 'O')
		|| (board[1] == 'X' && board[4] == 'X') || (board[1] == 'O' && board[4] == 'O')
		|| (board[9] == 'X' && board[8] == 'X') || (board[9] == 'O' && board[8] == 'O')) && (board[7] == ' ')) {
		turn2 = 7;
	}
	else if (((board[5] == 'X' && board[2] == 'X') || (board[5] == 'O' && board[2] == 'O')
		|| (board[9] == 'X' && board[7] == 'X') || (board[9] == 'O' && board[7] == 'O')) && (board[8] == ' ')) {
		turn2 = 8;
	}
	else if (((board[1] == 'X' && board[5] == 'X') || (board[1] == 'O' && board[5] == 'O')
		|| (board[7] == 'X' && board[8] == 'X') || (board[7] == 'O' && board[8] == 'O')
		|| (board[3] == 'X' && board[6] == 'X') || (board[3] == 'O' && board[6] == 'O')) && (board[9] == ' ')) {
		turn2 = 9;
	}
	else {
		turn2 = 0;
	}
}
export function skill_n1(board) {
	if (board[3] != currentMove && board[3] != ' ' && q == 2) {
		turn2 = 5;
	}
	else if (board[7] != currentMove && board[7] != ' ' && q == 2) {
		turn2 = 5;
	}
	else if (board[9] != currentMove && board[9] != ' ' && q == 2) {
		turn2 = 5;
	}
	else if (board[1] != currentMove && board[1] != ' ' && q == 2) {
		turn2 = 5;
	}
}
export function skill_n2(board) {
	if (((board[3] != currentMove && board[3] != ' ') && (board[7] != currentMove && board[7] != ' '))
		&& (board[5] == currentMove) && (board[4] == ' ' || board[6] == ' ')) {
		if (board[4] == ' ') {
			turn2 = 4;
		}
		else if (board[6] == ' ') {
			turn2 = 6;
		}
	}
	if (((board[1] != currentMove && board[1] != ' ') && (board[9] != currentMove && board[9] != ' '))
		&& (board[5] == currentMove) && (board[4] == ' ' || board[6] == ' ')) {
		if (board[4] == ' ') {
			turn2 = 4;
		}
		else if (board[6] == ' ') {
			turn2 = 6;
		}
	}
}
export function skill_n3(board) {
	if (((board[3] != currentMove && board[3] != ' ') || (board[7] != currentMove && board[7] != ' '))
		&& (board[5] != currentMove && board[5] != ' ') && (board[9] == ' ' || board[1] == ' ')) {
		if (board[9] == ' ') {
			turn2 = 9;
		}
		else if (board[1] == ' ') {
			turn2 = 1;
		}
	}
	if (((board[9] != currentMove && board[9] != ' ') || (board[1] != currentMove && board[1] != ' '))
		&& (board[5] != currentMove && board[5] != ' ') && (board[7] == ' ' || board[3] == ' ')) {
		if (board[7] == ' ') {
			turn2 = 7;
		}
		else if (board[3] == ' ') {
			turn2 = 3;
		}
	}
}
export function skill_n4(board) {
	if (board[5] == ' ' && (board[3] == ' ' || board[7] == ' ') && (board[9] == ' ' && board[1] == ' ')) {
		turn2 = 5;
	}
	if (board[5] == ' ' && (board[9] == ' ' || board[1] == ' ') && (board[7] == ' ' && board[3] == ' ')) {
		turn2 = 5;
	}
	else if (board[5] == currentMove && board[3] == ' ' && board[9] == ' ' && board[1] == ' ' && (board[2] == ' ' || board[6] == ' ')) {
		turn2 = 3;
	}
	else if (board[5] == currentMove && board[3] == currentMove && board[9] == ' ' && board[6] == ' ' && board[1] == ' ') {
		turn2 = 9;
	}
	else if (board[5] == currentMove && board[3] == currentMove && board[9] == ' ' && board[1] == ' ' && board[2] == ' ') {
		turn2 = 1;
	}
	else if (board[5] == currentMove && board[7] == ' ' && (board[4] == ' ' || board[8] == ' ') && (board[9] == ' ' || board[1] == ' ')
		&& board[3] != ' ') {
		turn2 = 7;
	}
	else if ((board[9] == ' ' && board[1] == ' ' && board[4] == ' ') && board[5] == currentMove && board[7] == currentMove) {
		turn2 = 1;
	}
	else if ((board[9] == ' ' && board[1] == ' ' && board[8] == ' ') && board[5] == currentMove && board[7] == currentMove) {
		turn2 = 9;
	}
	else if (board[5] == currentMove && board[1] == ' ' && board[7] == ' ' && board[3] == ' ' && (board[2] == ' ' || board[4] == ' ')) {
		turn2 = 1;
	}
	else if (board[5] == currentMove && board[1] == currentMove && board[2] == ' ' && board[3] == ' ' && board[7] == ' ') {
		turn2 = 3;
	}
	else if (board[5] == currentMove && board[1] == currentMove && board[4] == ' ' && board[3] == ' ' && board[7] == ' ') {
		turn2 = 7;
	}
	else if (board[5] == currentMove && board[9] == ' ' && (board[6] == ' ' || board[8] == ' ')
		&& board[7] == ' ' && board[3] == ' ' && board[1] != ' ') {
		turn2 = 9;
	}
	else if ((board[7] == ' ' && board[3] == ' ' && board[8] == ' ') && board[5] == currentMove && board[9] == currentMove) {
		turn2 = 7;
	}
	else if ((board[7] == ' ' && board[3] == ' ' && board[6] == ' ') && board[5] == currentMove && board[9] == currentMove) {
		turn2 = 3;
	}
}
export function skill_n5(board) {
	if (board[3] == ' ' && (board[9] == ' ' && board[1] == ' ')) {
		turn2 = 3;
	}
	else if ((board[9] == ' ' && board[1] == ' ' && board[6]) && (board[5] == ' ' && board[3] == currentMove)) {
		turn2 = 1;
	}
	else if (board[3] == currentMove && board[1] == currentMove && board[9] == ' ' && board[5] == ' ' && board[6] == ' ') {
		turn2 = 9;
	}
	else if (board[7] == ' ' && (board[9] == ' ' && board[1] == ' ')) {
		turn2 = 7;
	}
	else if ((board[9] == ' ' && board[1] == ' ' && board[4]) && (board[5] == ' ' && board[7] == currentMove)) {
		turn2 = 9;
	}
	else if (board[9] == currentMove && board[7] == currentMove && board[1] == ' ' && board[5] == ' ' && board[4] == ' ') {
		turn2 = 1;
	}
	else if (board[9] == ' ' && board[7] == ' ' && board[3] == ' ') {
		turn2 = 9;
	}
	else if ((board[9] == currentMove && board[3] == ' ' && board[7] == ' ') && (board[5] == ' ' && board[8] == ' ' && board[6] == ' ')) {
		turn2 = 3;
	}
	else if (board[3] == currentMove && board[9] == currentMove && board[7] == ' ' && board[5] == ' ' && board[8] == ' ') {
		turn2 = 7;
	}
	else if (board[1] == ' ' && board[7] == ' ' && board[3] == ' ') {
		turn2 = 1;
	}
	else if ((board[1] == currentMove && board[3] == ' ' && board[7] == ' ') && (board[5] == ' ' && board[2] == ' ' && board[4] == ' ')) {
		turn2 = 7;
	}
	else if (board[1] == currentMove && board[7] == currentMove && board[3] == ' ' && board[5] == ' ' && board[2] == ' ') {
		turn2 = 3;
	}
}
export function skill_n6(board) {
	if (board[3] == ' ' && board[7] == ' ' && (board[9] == ' ' || board[1] == ' ')) {
		turn2 = 3;
	}
	else if ((board[9] == ' ' || board[1] == ' ') && (board[7] == ' ' && board[3] == currentMove)) {
		turn2 = 7;
	}
	else if (board[3] == currentMove && board[7] == currentMove && board[1] == ' ' && board[2] == ' ' && board[4] == ' ') {
		turn2 = 1;
	}
	else if (board[7] == currentMove && board[3] == currentMove && board[9] == ' ' && board[8] == ' ' && board[6] == ' ') {
		turn2 = 9;
	}
	else if (board[9] == ' ' && board[1] == ' ' && (board[7] == ' ' || board[3] == ' ')) {
		turn2 = 9;
	}
	else if (board[9] == currentMove && board[1] == ' ' && (board[7] == ' ' && board[3] == ' ')) {
		turn2 = 1;
	}
	else if (board[9] == currentMove && board[1] == currentMove && board[7] == ' ' && board[8] == ' ' && board[4] == ' ') {
		turn2 = 7;
	}
	else if (board[9] == currentMove && board[1] == currentMove && board[2] == ' ' && board[3] == ' ' && board[6] == ' ') {
		turn2 = 3;
	}
}
export function randomMove(board) {
	let n = 0;
	do {
		n = Math.floor(Math.random() * 9) + 1; // Generate a random number between 1 and 9
		if (board[n] == ' ') {
			return n; // Return the random number if the position is empty
		}
	} while (true);
}
function checkwin(sym) {
	if ((board[1] == sym && board[2] == sym && board[3] == sym) || (board[4] == sym && board[5] == sym && board[6] == sym)
		|| (board[7] == sym && board[8] == sym && board[9] == sym) || (board[1] == sym && board[4] == sym && board[7] == sym)
		|| (board[2] == sym && board[5] == sym && board[8] == sym) || (board[3] == sym && board[6] == sym && board[9] == sym)
		|| (board[1] == sym && board[5] == sym && board[9] == sym) || (board[3] == sym && board[5] == sym && board[7] == sym)) {
		return true;
	}
	else
		return false;
}