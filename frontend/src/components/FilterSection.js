import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";


function FilterSection({ GetProducts, query }) {

  const [price, SetPrice] = useState(0);
  const [checked, setChecked] = useState(0);


  const handleApply = () => {
    console.log(checked)
    if (checked === 1) {
      GetProducts(query, '', 10)
    } else if (checked === 2) {
      GetProducts(query, '', 20)
    } else if (checked === 4) {
      GetProducts(query, '', 30)
    } else if (checked === 8) {
      GetProducts(query, '', 40)
    } else {
      GetProducts(query, '', 0)
    }
  };


  const handleCategoryChange = (e) => {
    if (e.target.value === "10") {
      setChecked(1)
    } else if (e.target.value === "20") {
      setChecked(2)
    } else if (e.target.value === "30") {
      setChecked(4)
    } else {
      setChecked(8)
    }
  };

  return (
    <MDBContainer className="mt-3">
      <MDBRow>
        <p>Price</p>
        <MDBCheckbox
          label="10"
          value={10}
          checked={checked & (1 << 0)}
          onChange={handleCategoryChange}
        />
        <MDBCheckbox
          label="20"
          value={20}
          checked={checked & (1 << 1)}
          onChange={handleCategoryChange}
        />
        <MDBCheckbox
          label="30"
          value={30}
          checked={checked & (1 << 2)}
          onChange={handleCategoryChange}
        />
        <MDBCheckbox
          label="40"
          value={40}
          checked={checked & (1 << 3)}
          onChange={handleCategoryChange}
        />
      </MDBRow>
      <MDBRow className="mt-3">
        <MDBBtn className="" color="primary" onClick={handleApply}>
          Apply
        </MDBBtn>
        <MDBBtn
          className=""
          color="secondary"
          onClick={() => {
            setChecked(0)
          }}
        >
          Clear
        </MDBBtn>
      </MDBRow>
    </MDBContainer>
  );
}

// Export the component
export default FilterSection;
