import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link, useSearchParams } from "react-router-dom";
import HttpClient from "../../Services/Helpers/Api/HttpClient";
import Url from "../../Services/Helpers/Url/Url";

const client = new HttpClient();
const url = new Url();

export default function SearchForm() {
  const [focusInput, setFocusInput] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [search] = useSearchParams("");
  const [songs, setSongs] = useState([]);

  const handleFocusInput = (status) => {
    setTimeout(() => {
      setFocusInput(status);
    }, 100);
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
    getSearch(e.target.value);
  };

  useEffect(() => {
    if (search.get("keyword")) {
      setKeyword(search.get("keyword"));
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const getSearch = async (keyword) => {
    const result = await client.get(client.songs, 
      { 
        q: keyword, 
        _limit: 5 
      }
      );
    setSongs(result.data);
  };

  return (
    <div className="header__search">
      <form onSubmit={handleSearchSubmit}>
        <div className={clsx("header__search--input", focusInput && "focus")}>
          <input
            className="form-control"
            placeholder="Tìm kiếm bài hát, nghệ sĩ,..."
            onFocus={() => {
              handleFocusInput(true);
            }}
            onBlur={(e) => {
              handleFocusInput(false);
            }}
            onChange={handleChangeKeyword}
            value={keyword}
          />
          <div className="search__suggest">
            {keyword ? (
              <>
                <p>
                  <Link to={url.getSearch({keyword: keyword, type:'songs'})}>
                    Tìm kiếm: {keyword}
                  </Link>
                </p>

                {songs.length > 0 && (
                  <>
                    <hr />
                    <p>
                      <b>Gợi ý kết quả</b>
                    </p>
                    {songs.map(({ id, name }) => (
                      <p key={id}>
                        <Link to={url.getSong(id, 'test-abc')}>{name}</Link>
                      </p>
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
                <p>
                  <b>Đề xuất cho bạn</b>
                </p>
                <p>
                  <a href="#">có chơi</a>
                </p>
                <p>
                  <a href="#">kỳ vọng</a>
                </p>
                <p>
                  <a href="#">karaoke</a>
                </p>
                <hr />
                <p>
                  <b>Tìm kiếm gần đây</b>
                </p>
                <p>
                  <a href="#">Lê Bảo Bình</a>
                </p>
                <p>
                  <a href="#">Ai chung tình được mãi</a>
                </p>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
