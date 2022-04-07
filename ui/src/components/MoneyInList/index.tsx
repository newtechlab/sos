import styled from "styled-components"
import { Slider } from "../Slider"

export default function MoneyInList() {
    return <OuterBox>
        <Slider />
    </OuterBox>
}

const OuterBox = styled.div`
    height: 100%;
    width: 100%;
    background: #F1F8F8;
    border: 1px solid #CFE3E3;
`