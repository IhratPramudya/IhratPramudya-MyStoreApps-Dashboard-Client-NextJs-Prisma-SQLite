import Slider from "rc-slider";



const PriceRangeSlider = ({ minValue,maxValue,value,handleChange}) => {
    return (
        <>
            <Slider range min={minValue} max={maxValue} defaultValue={value} onChange={handleChange}/>
        </>
    )
}


export default PriceRangeSlider;
