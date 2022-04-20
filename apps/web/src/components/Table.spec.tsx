import { randUuid } from "@ngneat/falso";
import { render, screen } from "@testing-library/react";
import { Table, TableColumn } from "./Table";
import userEvent from "@testing-library/user-event";
describe("Table", () => {
  type DataItem = {
    name: string;
    value: string;
  };

  const data: DataItem[] = Array.from({ length: 40 }).map(() => ({
    name: randUuid(),
    value: randUuid(),
  }));

  it("will render the table", () => {
    render(<Table columns={[]} data={data} />);
  });

  it("will render the table with a column", async () => {
    const column: TableColumn<DataItem, any> = {
      label: "This is the label",
      accessor: "name",
    };

    render(<Table columns={[column]} data={data} />);

    expect(await screen.findByText(column.label)).toBeInTheDocument();

    for (const item of data) {
      expect(await screen.findByText(item.name)).toBeInTheDocument();
    }
  });

  it("will render the table with extra props", async () => {
    const extraProps = {
      somethingClicked: jest.fn(),
    };

    const column: TableColumn<DataItem, typeof extraProps> = {
      label: "This is the label",
      accessor: (item, index, extraProps) => {
        return (
          <button data-testid={`item-${index}-button`} onClick={extraProps?.somethingClicked}>
            Button
          </button>
        );
      },
    };

    render(<Table columns={[column]} data={data} extraProps={extraProps} />);
    userEvent.click(await screen.findByTestId("item-0-button"));
    expect(extraProps.somethingClicked).toHaveBeenCalled();
  });

  it("will render empty placeholder", async () => {
    const column: TableColumn<DataItem, any> = {
      label: "This is the label",
      accessor: "name",
    };

    const noContent = <div data-testid="no-content" />;

    render(<Table columns={[column]} data={[]} emptyPlaceholder={noContent} />);
    expect(await screen.findByTestId("no-content")).toBeInTheDocument();
  });
});
