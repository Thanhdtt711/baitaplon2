import React, { useState, useEffect } from "react";
import "./Categories.scss";
import Options from "../../Services/Helpers/Options/Options";
import HttpClient from "../../Services/Helpers/Api/HttpClient";
import { Link } from "react-router-dom";
import Url from "../../Services/Helpers/Url/Url";

const optionObj = new Options();
const client = new HttpClient();
const url = new Url();

export default function Categories() {
  const [banner, setBanner] = useState("");

  const [categoies, setCategories] = useState([]);

  const getBanner = async () => {
    const banner = await optionObj.get("categories_banner");
    setBanner(banner);
  };

  const getCateries = async () => {
    const response = await client.get(client.categories, {
      _embed: "playlists"
    });

    if (response.response.ok) {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    getBanner();
    getCateries();
  }, []);

  return (
    <section className="categories">
      <div className="categories__banner">
        <img src={banner} />
      </div>

      {categoies.map(({ id, name, playlists }) => {
        return (
          <div className="categories__item" key={id}>
            <h2>
              {name}
              <Link to={url.getCategory(id)} className="float-end view-all">
                Xem tất cả
              </Link>
            </h2>
            <div className="categories__item--list">
              <div className="row">
                {playlists.map(({ id, name, image }, index) => {
                  if (index>=4){
                    return false;
                  }
                  return (
                    <div className="col-3" key={id}>
                      <div className="categories--item">
                        <Link to={url.getPlaylist(id)}>
                          <img src={image} />
                          <h3>{name}</h3>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
