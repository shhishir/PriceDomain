Price Domain.

## Run the project with
`npm run serve`

Different task that can be carried out are,
- Add price to a product.
`http://localhost:6060/product/{product_id}`
    - Body can be: 
    <pre> {      
	    "market": { "id": { "value": 1 }, "name": "Denmark" }, <br>
	    "id": { "value": 1 }, <br>
	    "from_date": "2022/10/10", <br>
	    "until_date": "2022/10/10", <br>
	    "price": 1000, <br>
	    "currency": { "id": "DKK" } <br>
    } </pre>


- Get prices of a product.
`http://localhost:6060/product/{product_id}/{price_id}`


- Change price of a product.
`http://localhost:6060/product/{product_id}`
    - Body can be:
    <pre> {      
	    "market": { "id": { "value": 1 }, "name": "Denmark" }, <br>
	    "id": { "value": 1 }, <br>
	    "from_date": "2022/10/10", <br>
	    "until_date": "2022/10/10", <br>
	    "price": 499, <br>
	    "currency": { "id": "DKK" } <br>
    } </pre>


- Remove price on a product.
`http://localhost:6060/product/{product_id}`
    - Body :
        <pre>{ "price_id": 1 } </pre>