import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

interface TabloProps {
  data: { ID: number; KitapAdi: string; SayfaSayisi: number }[];
}

function Tablo({ data }: TabloProps) {
  const columns: GridColDef[] = [
    { field: "ID", headerName: "No", width: 70 },
    { field: "KitapAdi", headerName: "Book Title", width: 200 },
    { field: "SayfaSayisi", headerName: "Page Count", width: 130 },
  ];

  return (
    <Paper elevation={3} sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        rowHeight={25}
        pageSizeOptions={[7]}
        getRowId={(row) => row.ID}
      />
    </Paper>
  );
}

export default Tablo;
