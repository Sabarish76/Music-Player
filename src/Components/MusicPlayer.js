import React, { useRef, useState, useEffect } from "react";
import {
  BsFillFastForwardCircleFill,
  BsFillSkipBackwardCircleFill,
  BsFillPauseCircleFill,
} from "react-icons/bs";
import { BsFillPlayCircleFill } from "react-icons/bs";
import "./MusicPlayer.css";

function MusicPlayer() {
  const Music = [
    {
      title: "Hukum",
      artist: "Aniruth",
      artwork: require("../assets/images/jailer.jpg"),
      url: require("../assets/music/Hukum.mp3"),
      id: "1",
    },
    {
      title: "Bad Liar",
      artist: "Imagine Dragons",
      artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
      url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
      id: "2",
    },
    {
      title: "Faded",
      artist: "Alan Walker",
      artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
      url: "https://samplesongs.netlify.app/Faded.mp3",
      id: "3",
    },
    {
      title: "Hate Me",
      artist: "Ellie Goulding",
      artwork: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
      url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
      id: "4",
    },
    {
      title: "Solo",
      artist: "Clean Bandit",
      artwork: "https://samplesongs.netlify.app/album-arts/solo.jpg",
      url: "https://samplesongs.netlify.app/Solo.mp3",
      id: "5",
    },
    {
      title: "Without Me",
      artist: "Halsey",
      artwork: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
      url: "https://samplesongs.netlify.app/Without%20Me.mp3",
      id: "6",
    },
  ];

  const [play, setPlay] = useState(0);
  const [playsong, setPlaySong] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (playsong) {
      audioRef.current = new Audio(Music[play].url);
      audioRef.current.play();

      audioRef.current.addEventListener("ended", () => {
        setPlay((e) => (e + 1) % Music.length);
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [playsong, play, Music]);
  const forward = () => {
    setPlay((e) => (e + 1) % Music.length);
  };
  const previous = () => {
    setPlay((e) => (e - 1 + Music.length) % Music.length);
  };
  const audio = () => {
    setPlaySong((prevState) => !prevState);
  };
  const song = Music[play];
  return (
    <div className="Main">
      <section id={song.id} className="Container">
        <h1>Music Player</h1>
        {/* <h1 className='title'>{song.title}</h1>
         <h2 className='artist'>{song.artist}</h2> */}
        <img src={song.artwork}></img>
        <br></br>
        <h2>
          {song.title}({song.artist})
        </h2>
        <div className="btns">
          <BsFillSkipBackwardCircleFill
            onClick={previous}
            className="previous"
          />
          {playsong ? (
            <BsFillPauseCircleFill onClick={audio} />
          ) : (
            <BsFillPlayCircleFill onClick={audio} />
          )}

          <BsFillFastForwardCircleFill onClick={forward} />
        </div>
      </section>
    </div>
  );
}

export default MusicPlayer;
