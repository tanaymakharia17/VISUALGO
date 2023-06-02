import Swap from "../helpers/Swap";
import Highlight from "../helpers/Highlight";

const BubbleSort = async ({ data, setData }) => {
  let length = data.length;
  //let flag=0;
  for (let i = 0; i < length - 1; ++i) {
    for (let j = 0; j < length - 1 - i; ++j) {
      //flag=1;
      await Highlight({
        nodes: [j, j + 1],
        data: data,
        setData: setData,
      });
      if (data[j + 1].num < data[j].num) {
        //flag=0;
        Swap(j + 1, j, data);
      }
      setData(data);
    }
    
  }
};

export default BubbleSort;
