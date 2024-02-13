import {Link} from "react-router-dom";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

export default function Statistics() {
  const [tuples, setTuples] = useState([]);
  const [loading, setLoading] = useState(true);
  const {setNotification, user} = useStateContext();

  useEffect(() => {
    if(Object.keys(user).length == 0) return;
    getHashes();
  }, [user])

  const getHashes = () => {
    setLoading(true)
    axiosClient.get('/statistics')
    .then(({ data }) => {
        console.log(data);
        setLoading(false)
        const newTuples = [["Alg", "times used"]];
        const times = data.data.reduce((a, b) => {
          if(b.user_id != user.id){
            return a;
          }
          a[b.algorithm] = (a[b.algorithm] || 0) + 1;
          return a;
        }, {} );
        Object.entries(times).forEach(tuple => newTuples.push(tuple));
        setTuples(newTuples);
        console.log(newTuples);
      })
      .catch((e) => {
        setLoading(false)
      })
  }

  const options = {
    title: "Hash algorithms used:",
    pieHole: 0.4,
    is3D: false,
  };

  return !loading ?
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={tuples}
        options={options}
      />
    : <p className="text-center"> Loading... </p>;

}
