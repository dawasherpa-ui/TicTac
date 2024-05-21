'use client'
import React, { useState, useEffect } from "react";
import Circle from '@/image/circle.png';
import Cross from '@/image/cross.png';
import Image from "next/image";
function Page() {
  const totalBlock: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const winningDigit: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const [player1, setPlayer1] = useState<number[]>([]);
  const [player2, setPlayer2] = useState<number[]>([]);
  const [playerWon1, setPlayerWon1] = useState<number>(0);
  const [playerWon2, setPlayerWon2] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    if (checkWinner(player1)) {
      alert("Nice Player X won")
      setWinner(1);
      setPlayerWon1(playerWon1 + 1)
    } else if (checkWinner(player2)) {
      alert("Nice...,Player O won")
      setWinner(2);
      setPlayerWon2(playerWon2+ 1)
    }
    else{
    if (draw()){
      alert("Woow...,It's Draw")
      setPlayer1([]); 
      setPlayer2([]);
      setWinner(null);
    }}
  }, [player1, player2]);
  const draw=()=>{
    const joint =player1.concat(player2)
    if (joint.length==totalBlock.length)return true;
    return false;
  }
  const checkWinner = (player: number[]): boolean => {
    return winningDigit.some((combo) => {
      return combo.every((digit) => player.includes(digit));
    });
  };

  const handleClick = (elem: number): void => {
    if (
      player1.includes(elem) ||
      player2.includes(elem) ||
      winner !== null
    ) {
      return;
    }
    if (currentPlayer === 1) {
      setPlayer1([...player1, elem]);
      setCurrentPlayer(2);
    } else {
      setPlayer2([...player2, elem]);
      setCurrentPlayer(1);
    }
  };
  const  handleReset=()=>{
    setPlayer1([]);
    setPlayer2([]);
    setWinner(null);
    setCurrentPlayer(1);
  }
  return (
    <div className='h-[100vh] p-5 flex flex-col container-center'>
      <h1 className='text-4xl font-semibold text-center'>TicTac</h1>
      <div className='flex flex-col gap-5'>
        <div className='h-[auto] grid grid-cols-2 w-full gap-5'>
          <div className='playerOne bg-slate-500 rounded-md p-2'>
            <h2 className='text-xl'>Player X</h2>
            <h2 className='text-xl'>{playerWon1}</h2>
          </div>
          <div className='playerTwo bg-slate-500 rounded-md p-2'>
            <h2 className='text-xl'>Player O</h2>
            <h2 className='text-xl'>{playerWon2}</h2>
          </div>
        </div>
        <div className="flex-grow h-full w-full">
      <div className="w-[70vw] sm:w-[60vw] md:w-[25rem] bg-slate-800 mx-[auto] h-[70vw] sm:h-[60vw] md:h-[25rem] grid grid-cols-3 grid-rows-3 gap-1">
        {totalBlock.map((elem: number, i: number) => (
          <div
            key={elem}
            onClick={() => {
              handleClick(elem);
            }}
            style={{
              backgroundColor:"white",
            }}
          >
           {   player1.includes(elem) 
                  ? <Image src={Cross} alt="img" width={400} height={400} className="w-full h-full" />
                  : player2.includes(elem) 
                  ? <Image src={Circle} alt="img" width={400} height={400} className="w-full h-full" />
                  : null}
          </div>
        ))}
      </div>
      {winner && <div>Player {winner} wins!</div>}
      <button onClick={handleReset} className="text-xl border-[1px] border-black px-5 rounded-md hover:bg-slate-500 active:relative top-1">Again</button>
    </div>
      </div>
    </div>
  )
}

export default Page
