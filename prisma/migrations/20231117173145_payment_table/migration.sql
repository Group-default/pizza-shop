-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "endToEndId" TEXT NOT NULL,
    "txid" TEXT NOT NULL,
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "infoPagador" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
