import sql from "mssql";
import type { NextApiRequest, NextApiResponse } from "next";

type IQuery = {
  q: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sql.connect(
    "Server=localhost;Database=Company_BisMaz;User Id=sa;Password=Biswa@9804;Encrypt=false;trustServerCertificate:false"
  );
  await sql
    .query(
      `select fname,lname,sex,dno from employee where fname like '%${
        (req.query as IQuery).q
      }%'`
    )
    .then((resp) => {
      return res.status(200).send(resp.recordset);
    });
}
