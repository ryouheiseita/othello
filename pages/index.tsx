import type { NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
  background-color: green;
`

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`

const Board = styled.div`
  width: 480px;
  height: 480px;
  font-size: 0;
  background-color: white;
  border: 0 solid;
`

const Cell = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 1px solid;
  border-color: black;
`

const Stonecandidate = styled.div`
  width: 50px;
  height: 50px;
  margin: 5px;
  background: yellow;
  border-radius: 50%;
`
const Stoneblack = styled.div`
  width: 50px;
  height: 50px;
  margin: 5px;
  background: black;
  border-radius: 50%;
`

const Stonewhite = styled.div`
  width: 50px;
  height: 50px;
  margin: 5px;
  background: white;
  border: 1px solid;
  border-color: black;
  border-radius: 50%;
`

const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  text-align: center;
`

const Code = styled.code`
  padding: 0.75rem;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
  font-size: 1.1rem;
  background: #fafafa;
  border-radius: 5px;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin-top: 3rem;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`

const Card = styled.a`
  width: 45%;
  padding: 1.5rem;
  margin: 1rem;
  color: inherit;
  text-align: left;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  :hover,
  :focus,
  :active {
    color: #0070f3;
    border-color: #0070f3;
  }

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;

  a {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }
`

const Logo = styled.span`
  height: 1em;
  margin-left: 0.5rem;
`

const Home: NextPage = () => {
  // prettier-ignore
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ])
  const [currentTurn, setTurn] = useState(1)
  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ]
  // const passBoard: number[][] = JSON.parse(JSON.stringify(board))
  // const pass: { y: number; x: number }[] = []
  let passFlg = false
  const puttableBoard = useMemo(() => {
    // prettier-ignore
    // const tempBoard = [
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 1, 2, 0, 0, 0],
    //   [0, 0, 0, 2, 1, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    // ]
    const tempBoard: number[][] = JSON.parse(JSON.stringify(board))
    const candidates: { y: number; x: number }[] = []
    const otherStorn = 3 - currentTurn
    board.forEach((row, y2) =>
      row.forEach((color, x2) => {
        if (tempBoard[y2][x2] === currentTurn) {
          // console.log(y2, 'syokitate')
          // console.log(x2, 'syokiyoko')
          for (const direction in directions) {
            let tate = y2
            let yoko = x2
            for (let number = 1; number < 8; number++) {
              tate = y2 + directions[direction][1] * number
              yoko = x2 + directions[direction][0] * number
              if (0 <= tate && 7 >= tate && 0 <= yoko && 7 >= yoko) {
                if (tempBoard[tate][yoko] === otherStorn) {
                  const okesounaTate = tate + directions[direction][1]
                  const okesounaYoko = yoko + directions[direction][0]
                  if (
                    0 <= okesounaTate &&
                    7 >= okesounaTate &&
                    0 <= okesounaYoko &&
                    7 >= okesounaYoko
                  ) {
                    if (tempBoard[okesounaTate][okesounaYoko] === 0) {
                      candidates.push({ y: okesounaTate, x: okesounaYoko })
                    }
                  }
                } else {
                  break
                }
              }
            }
          }
        }
      })
    )
    // console.log(candidates, 'candidates')
    if (candidates.length) {
      for (const candidate in candidates) {
        if (tempBoard[candidates[candidate].y][candidates[candidate].x] === 0) {
          tempBoard[candidates[candidate].y][candidates[candidate].x] = 3
        }
      }
    } else {
      passFlg = true
      // pass.push(...candidates)
      // console.log(tempBoard)
      // setTurn(3 - currentTurn)
      // console.log(currentTurn)
    }
    return tempBoard
  }, [board])

  // console.log(pass.length, 'pass')
  if (passFlg) {
    setTurn(3 - currentTurn)
    setBoard(puttableBoard)
    console.log(currentTurn, 'currentturn')
  }
  // pass.length = 0

  const onClick = (x: number, y: number, color: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))
    const directions = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
    ]
    const turnables: { y: number; x: number }[] = []
    for (const direction in directions) {
      let vertical = y
      let beside = x
      const candidates: { y: number; x: number }[] = []
      for (let number = 1; number < 8; number++) {
        vertical = y + directions[direction][1] * number
        beside = x + directions[direction][0] * number
        if (0 <= vertical && 7 >= vertical && 0 <= beside && 7 >= beside) {
          // if (newBoard[vertical][beside] === 0 && newBoard[vertical][beside] === 3) {
          if (newBoard[vertical][beside] === 0) {
            break
          } else if (newBoard[vertical][beside] !== currentTurn) {
            console.log(newBoard[vertical][beside])
            candidates.push({ y: vertical, x: beside })
          } else {
            turnables.push(...candidates)
          }
        }
      }
      for (const turnable in turnables) {
        newBoard[turnables[turnable].y][turnables[turnable].x] = currentTurn
      }
    }
    if (turnables.length) {
      newBoard[y][x] = currentTurn
      setBoard(newBoard)
      const turn = currentTurn === 1 ? 2 : 1
      setTurn(turn)
    }
  }
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Board>
          {board.map((row, y) =>
            row.map((color, x) => (
              <Cell key={x} onClick={() => onClick(x, y, color)}>
                {color === 1 && <Stoneblack></Stoneblack>}
                {color === 2 && <Stonewhite></Stonewhite>}
                {color === 0 && puttableBoard[y][x] === 3 && <Stonecandidate></Stonecandidate>}
              </Cell>
            ))
          )}
        </Board>
      </Main>

      <Footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Logo>
            <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </Logo>
        </a>
      </Footer>
    </Container>
  )
}

export default Home
