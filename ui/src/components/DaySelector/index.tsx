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
        <h1>Velg dag for utbetaling </h1>

        <Table celled structured textAlign="center">
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
        </Table>
    </div>
    }

export const StyledCell = styled(Table.Cell)`
  padding: 20px !important;
`;
