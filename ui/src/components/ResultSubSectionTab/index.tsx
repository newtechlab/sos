import { Grid, ItemDescription } from "semantic-ui-react";
import styled from "styled-components";
import { StepDefinition } from "../Steps";

interface ResultSubSectionTabProps {
    items: StepDefinition[];
    selectedItem: StepDefinition | undefined;
}

export default function ResultSubSectionTab(props: ResultSubSectionTabProps) {
    const { items, selectedItem } = props;

    return <StyledContainerDiv>
            <StyledGrid columns={items.length}>
            { items.map((i: StepDefinition) => {

                if (i.heading === selectedItem?.heading) {
                    return <StyledGridSelectedColumn>{i.heading}</StyledGridSelectedColumn>
                }

                return <StyledGridColumn>{i.heading}</StyledGridColumn>
            })} 
        </StyledGrid>
    </StyledContainerDiv>

}

const StyledContainerDiv = styled.div`
    width: 500px;
`

const StyledGrid = styled(Grid)`
`

const StyledGridSelectedColumn = styled(Grid.Column)`
    border: 1px solid #CCC;
    background-color: white;
`

const StyledGridColumn = styled(Grid.Column)`
    border: 1px solid #CCC;
    background-color: #CCC;
`