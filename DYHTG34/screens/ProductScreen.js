

const ProductScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let response = await fetch('https://www.guitarguitar.co.uk/hackathon/products');
      let products = await response.json();
      setData(products);
    }
    catch(error) {
      console.error("Error fetching data: ", error);
    }
    setLoading(false);
  }

}
