-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Priorities" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "tb_users" (
    "id" TEXT NOT NULL,
    "profileImageUrl" VARCHAR(350),
    "name" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Roles" DEFAULT 'USER',
    "address_id" INTEGER,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_addresses" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(50) NOT NULL,
    "zipCode" VARCHAR(8) NOT NULL,
    "number" VARCHAR(5) NOT NULL,
    "city" VARCHAR(20) NOT NULL,
    "state" VARCHAR(2) NOT NULL,

    CONSTRAINT "tb_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_todos" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "accomplished" BOOLEAN NOT NULL DEFAULT false,
    "priority" "Priorities" NOT NULL DEFAULT 'LOW',
    "user_id" TEXT NOT NULL,

    CONSTRAINT "tb_todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(10) NOT NULL,

    CONSTRAINT "tb_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_todo_tag" (
    "todo_id" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "tb_todo_tag_pkey" PRIMARY KEY ("todo_id","tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_username_key" ON "tb_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_address_id_key" ON "tb_users"("address_id");

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_users_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "tb_addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_todos" ADD CONSTRAINT "tb_todos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_todo_tag" ADD CONSTRAINT "tb_todo_tag_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "tb_todos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_todo_tag" ADD CONSTRAINT "tb_todo_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tb_tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
