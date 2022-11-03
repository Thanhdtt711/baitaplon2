import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Error404 from "../Errors/Error404";
import "./Playlist.scss";
import HttpClient from "../../Services/Helpers/Api/HttpClient";
import Url from "../../Services/Helpers/Url/Url";
import { playerSelector, doPlay, doOpenPlayer } from "../../Components/Player/playerSlice";
import { useDispatch, useSelector } from "react-redux";

const client = new HttpClient();
const url = new Url();

let isFirstLoad = true;

export default function Playlist() {
  const params = useParams();

  const { id } = params;

  const [playlist, setPlaylist] = useState({});

  const [songs, setSongs] = useState([]);

  const [status, setStatus] = useState("pending");

  const [singlePlaylist, setSinglePlaylist] = useState([]);

  const [songPlaying, setSongPlaying] = useState(null); 

  const playInfo = useSelector(playerSelector);

  const {isPlay:playStatus} = playInfo;

  const dispatch = useDispatch();

  const getPlaylist = async () => {
    const res = await client.get(client.playlists + "/" + id);
    if (res.response.ok) {
      setPlaylist(res.data);

      //Xử lý lấy id bài hát
      const resSongPlaylists = await client.get(client.songPlaylists, {
        playlistId: id,
      });

      if (resSongPlaylists.response.ok) {
        if (resSongPlaylists.data.length) {
          const songIds = resSongPlaylists.data.map(({ songId }) => {
            const itemObj = { id: songId };
            return new URLSearchParams(itemObj).toString();
          });

          if (songIds.length) {
            const resSongs = await client.get(
              client.songs + "?" + songIds.join("&")
            );

            const resSongSingle = await client.get(
              client.songSingle +
                "?" +
                songIds.join("&").replace(/id/g, "songId") //regex
            );

            if (resSongSingle.data.length) {
              let singles = [];
              for (const index in resSongSingle.data) {
                const { singleId } = resSongSingle.data[index];
                const resSingle = await client.get(
                  client.single + "/" + singleId
                );
                resSongs.data[index].single = resSingle.data;

                singles.push(resSingle.data); //push ca sĩ hát trong cả playlist
              }

              singles = singles.filter(
                (value, index, self) =>
                  index === self.findIndex((t) => t.id === value.id)
              );

              setSinglePlaylist(singles);
            }

            if (resSongs.response.ok) {
              setSongs(resSongs.data);
              console.log(resSongs.data)
            }
          }
        }

        setStatus("success");
      }
    } else {
      setStatus("404");
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  //Click vào nút tiếp tục phát
  const handlePlay = () => {
    //isFirstLoad = false;
    const playInfoUpdate = {...playInfo}
    playInfoUpdate.isPlay = playStatus ? false : true

    dispatch(doPlay(playInfoUpdate));
   // dispatch(doPlay(playStatus ? false : true));
  };

  //Click vào từng bài hát trong playlist
  const handlePlaySong = ({id, name, image, source, single}) => {
    setSongPlaying(id); //Cập nhật id bài hát muốn nghe
    const {name:singleName} = single;
    dispatch(doOpenPlayer(true));
    const playInfoUpdate = {...playInfo}
    playInfoUpdate.info = {
      id: id,
      name: name,
      image: image,
      singleName: singleName,
      source: source
    }
    playInfoUpdate.isPlay = true;

    dispatch(doPlay(playInfoUpdate));
    localStorage.setItem("information", id);
  };

  const renderPlaylist = () => {
    let jsx = null;
    if (status === "success") {
      const singles = singlePlaylist.map(({ id, name }, index) => {
        return (
          <React.Fragment key={id}>
            {index < singlePlaylist.length - 1 ? (
              <>
                <Link to="/">{name}</Link>,{" "}
              </>
            ) : (
              <Link to="/">{name}</Link>
            )}
          </React.Fragment>
        );
      });

      let classPlaying = null;
      if (playStatus) {
        classPlaying = "playing";
      } else if (!isFirstLoad && !playStatus) {
        //classPlaying = 'playend';
      } else {
        classPlaying = "";
      }
      jsx = (
        <section className="playlist">
          <div className="row">
            <div className="col-3">
              <div className="playlist__image">
                <img className={classPlaying} src={playlist.image} />
              </div>
              <div className="playlist__info">
                <h2>{playlist.name}</h2>
                <p>Cập nhật: {playlist.updated_at}</p>
                <p>{singles}</p>
                <p>{playlist.follow} người yêu thích</p>
              </div>
              <div className="playlist__actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePlay}
                >
                  {playStatus ? (
                    <>
                      <i className="fa-solid fa-pause"></i> Tạm dừng
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-play"></i> Tiếp tục phát
                    </>
                  )}
                </button>
                <p className="text-center mt-2 favourite">
                  <a href="">
                    <i className="fa-regular fa-heart"></i>
                  </a>
                </p>
              </div>
            </div>
            <div className="col-9">
              <table className="table table-bordered playlist__songs">
                <thead>
                  <tr>
                    <th>Bài hát</th>
                    <th width="10%">Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.length ? (
                    songs.map(({ id, name, duration, image, single, source }) => {
                      //console.log(single);
                      const { name: singleName, id: singleId } = single;
                      return (
                        <tr key={id} className={id===songPlaying ? 'highlight':''}>
                          <td>
                            <div className="playlist--item d-flex">
                              <img src={image} />
                              <span>
                                <a href="#" onClick={(e) => {
                                  e.preventDefault();
                                  handlePlaySong({id, name, image, single, source});
                                }}>
                                  {name}
                                </a>

                                <Link to={url.getSingle(singleId)}>
                                  {singleName}
                                </Link>
                              </span>
                            </div>
                          </td>
                          <td>{duration}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={2} className="text-center">
                        Không có bài hát
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );
    }

    if (status === "404") {
      jsx = <Error404 />;
    }

    return jsx;
  };

  return renderPlaylist();
}
