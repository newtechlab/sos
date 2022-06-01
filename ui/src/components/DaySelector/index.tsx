import _, { valuesIn } from "lodash";
import { useState } from "react";
import { Table } from "semantic-ui-react";
import styled from "styled-components";

interface DaySelectorProps {
    itemSelected: (day: number) => void
}

export default function DaySelector(props: DaySelectorProps) {
    const { itemSelected } = props;
    const [selected, setSelected] = useState<number | undefined>(undefined);

    return <div>
        <StyledHeaderDiv>
            <h1>Velg dag for utbetaling </h1>
            <p>Hvis du ikke vet nøyaktig dato kan du  velge en ca. dato</p>
        </StyledHeaderDiv>

        <StyledTable celled structured textAlign="center">
            <Table.Body>
            { _.range(0,4).map((a) => {
                return <Table.Row key={`row${a}`}>
                    {  _.range(1,8).map((b) => {
                        const value=a * 7 + b
                        return <StyledCell 
                            key={`cell${value}`}
                            active={ value === selected }
                            onClick={() => {
                                setSelected(value)
                                itemSelected(value)}
                            }
                            selectable>{ value }</StyledCell>
                    }) }
                </Table.Row> 
            })}
            </Table.Body>
        </StyledTable>
    </div>
    }

export const StyledTable = styled(Table)`
    margin-top: 0 !important;
`;

export const StyledCell = styled(Table.Cell)`
  padding: 20px !important;
`;

export const StyledHeaderDiv = styled.div`
  background-color: white;
  padding: 2em;
  text-align: center;
  border-top: 1px solid #DDD;
  border-right: 1px solid #DDD;
  border-left: 1px solid #DDD;
`;
