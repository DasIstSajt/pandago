-- CreateTable
CREATE TABLE `felhasznalok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telszam` VARCHAR(191) NOT NULL,
    `jelszo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `felhasznalok_email_key`(`email`),
    UNIQUE INDEX `felhasznalok_telszam_key`(`telszam`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utazasok` (
    `floId` INTEGER NOT NULL,
    `utId` INTEGER NOT NULL,

    PRIMARY KEY (`floId`, `utId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `indulas` DATETIME(3) NOT NULL,
    `indulasiHely` VARCHAR(191) NOT NULL,
    `veg` DATETIME(3) NOT NULL,
    `uticel` VARCHAR(191) NOT NULL,
    `ar` INTEGER NOT NULL,
    `jarmu` VARCHAR(191) NOT NULL,
    `tervezoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utazasiprogramok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `utId` INTEGER NOT NULL,
    `prmId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(191) NOT NULL,
    `leiras` VARCHAR(191) NOT NULL,
    `tipus` VARCHAR(191) NOT NULL,
    `ar` INTEGER NOT NULL,
    `kezdes` DATETIME(3) NOT NULL,
    `intervallum` DOUBLE NOT NULL,
    `kapacitas` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programvezetesek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prmId` INTEGER NOT NULL,
    `pfsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programfelelosok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telszam` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `programfelelosok_email_key`(`email`),
    UNIQUE INDEX `programfelelosok_telszam_key`(`telszam`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `utazasok` ADD CONSTRAINT `utazasok_floId_fkey` FOREIGN KEY (`floId`) REFERENCES `felhasznalok`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `utazasok` ADD CONSTRAINT `utazasok_utId_fkey` FOREIGN KEY (`utId`) REFERENCES `utak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `utak` ADD CONSTRAINT `utak_tervezoId_fkey` FOREIGN KEY (`tervezoId`) REFERENCES `felhasznalok`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `utazasiprogramok` ADD CONSTRAINT `utazasiprogramok_utId_fkey` FOREIGN KEY (`utId`) REFERENCES `utak`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `utazasiprogramok` ADD CONSTRAINT `utazasiprogramok_prmId_fkey` FOREIGN KEY (`prmId`) REFERENCES `programok`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programvezetesek` ADD CONSTRAINT `programvezetesek_prmId_fkey` FOREIGN KEY (`prmId`) REFERENCES `programok`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programvezetesek` ADD CONSTRAINT `programvezetesek_pfsId_fkey` FOREIGN KEY (`pfsId`) REFERENCES `programfelelosok`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
