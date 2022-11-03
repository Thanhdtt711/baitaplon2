import React, { useEffect, useState } from "react";
import "./Categories.scss";
import { useParams, Link } from "react-router-dom";
import HttpClient from "../../Services/Helpers/Api/HttpClient";
import Url from "../../Services/Helpers/Url/Url";
import Error404 from "../Errors/Error404";

const client = new HttpClient();
const url = new Url();

export default function Category() {
  const params = useParams();
  const { id } = params;

  const [category, setCategory] = useState({});

  const [status, setStatus] = useState('pending');

  const getCategory = async () => {
    const res = await client.get(client.categories + "/" + id, {
      _embed: "playlists",
    });

    if (res.response.ok) {
      setCategory(res.data);
      setStatus('success');
    }else{
      setStatus('404');
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const renderPlaylists = () => {
    let jsx = null;
    if (status==='success'){
      jsx = category.playlists.map(({ id, name, image }) => {
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
      })
    }

    if (status==='404'){
      jsx = <Error404 />
    }

    return jsx;
  }

  return (
    <section className="categories">
      <div className="categories__banner">
        <img src={category.banner} />
      </div>
      <div className="categories__item">
        <div className="categories__item--list">
          <div className="row g-3">
            {renderPlaylists()}
          </div>
        </div>
      </div>
    </section>
  );
}
