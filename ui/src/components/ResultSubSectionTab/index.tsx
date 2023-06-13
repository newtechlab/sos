import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import { StepDefinition } from "../Steps";

interface ResultSubSectionTabProps {
    items: StepDefinition[];
    selectedItem: StepDefinition | undefined;
    goToStep: (step: StepDefinition) => void
}

export default function ResultSubSectionTab(props: ResultSubSectionTabProps) {
    const { items, selectedItem, goToStep } = props;

    return <StyledContainerDiv>
            <StyledGrid celled='internally' columns={items.length}>
            { items.map((i: StepDefinition) => {

                if (i.heading === selectedItem?.heading) {
                    return <StyledGridSelectedColumn key={i.id}>{i.heading}</StyledGridSelectedColumn>
                }

                return <StyledGridColumn key={i.id} onClick={() => { goToStep(i); }}>{i.heading}</StyledGridColumn>
            })} 
        </StyledGrid>
    </StyledContainerDiv>

}

const StyledContainerDiv = styled.div`
    width: 500px;
    drop-shadow(16px 16px 10px black);
`

const StyledGrid = styled(Grid)`
    
`

const StyledGridSelectedColumn = styled(Grid.Column)`
    background-color: white;
    font-weight: bold !important;
    padding-right: 20px;
    border-right: 10px solid #F1F8F8;
`

const StyledGridColumn = styled(Grid.Column)`
    background-color: #EEE;
    padding-right: 20px;
    border-right: 10px solid #F1F8F8;

    &:hover {
        cursor: pointer;
        background-color: white;
    }
`