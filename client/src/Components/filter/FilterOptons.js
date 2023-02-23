function FilterOptions(props) {
    let {locationList, getFilterResult} = props
    return ( 
        <>
            <aside className="col-12 col-lg-3 p-2 px-4">
                <div className="filters">
                    <h3>Filters</h3>
                    <div className="select-location">
                        <h5>Location</h5>
                        <select name="city" id="city">
                            <option value="select">Select Location</option>
                            {
                            locationList.map((location, index) => {
                            return <option key={index} value="">{location.name}, {location.city}</option>
                            })
                            }
                        </select>                        
                    </div>
                    <div className="cuisines mt-3">
                        <h5>Cuisines</h5>
                        <input type="checkbox" name="Location" id="north" />
                        <span className="left-headings3"><label htmlFor="north">North indian</label></span>
                        <br />
                        <input type="checkbox" name="Location" id="south" />
                        <span className="left-headings3"><label htmlFor="south">South indian</label></span>
                        <br />
                        <input type="checkbox" name="Location" id="east" />
                        <span className="left-headings3"><label htmlFor="east">chinese</label></span>
                        <br />
                        <input type="checkbox" name="Location" id="west" />
                        <span className="left-headings3"><label htmlFor="east">fast food</label></span>
                        <br />
                        <input type="checkbox" name="Location" id="south" />
                        <span className="left-headings3"><label htmlFor="east">street food</label></span>                   
                    </div>
                    <div className="prices mt-3">
                        <h5 >Cost For Two</h5>
                        <input type="radio" name="cost" id="price-range"
                        value="0-500" onChange={(event) => {
                            getFilterResult(event, "CostForTwo" )
                        }} />
                        <span className="left-headings3"><label htmlFor="price">Less than ₹500</label></span>
                        <br />
                        <input type="radio" name="cost" id="price-range"
                        value="500-1000" onChange={(event) => {
                            getFilterResult(event, "CostForTwo" )
                        }} />
                        <span className="left-headings3"><label htmlFor="price">₹500 to ₹1000</label></span>
                        <br />
                        <input type="radio" name="cost" id="price-range"
                        value="1000-1500" onChange={(event) => {
                            getFilterResult(event, "CostForTwo" )
                        }} />
                        <span className="left-headings3"><label htmlFor="price">₹1000 to ₹1500</label></span>
                        <br />
                        <input type="radio" name="cost" id="price-range"
                        value="1500-2000" onChange={(event) => {
                            getFilterResult(event, "CostForTwo" )
                        }} />
                        <span className="left-headings3"><label htmlFor="price">₹1500 to ₹2000</label></span>
                        <br />
                        <input type="radio" name="cost" id="price-range"
                        value="2000-1000000" onChange={(event) => {
                            getFilterResult(event, "CostForTwo" )
                        }} />
                        <span className="left-headings3"><label htmlFor="price">₹2000+</label></span>
                    </div>
                    <div className="sorting mt-3">
                        <h5>Sort</h5>
                        <input type="radio" name="sort" id="price-range" value="1" 
                        onChange={(event) => {
                            getFilterResult(event, "sort" )
                        }} />
                        <span className="left-headings3"><label htmlFor="price">price low to high</label></span>
                        <br />
                        <input type="radio" name="sort" id="price-range" value="-1" 
                        onChange={(event) => {
                            getFilterResult(event, "sort" )
                        }} />
                        <span className="left-headings3"><label htmlFor="price">price high to low</label></span>
                    </div>
                </div>
            </aside>
        </>
    )
}
export default FilterOptions;