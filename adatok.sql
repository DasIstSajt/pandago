INSERT INTO `felhasznalok` (`nev`,`email`,`telszam`, `jelszo`) VALUES ('Győrfi Krisztián', 'gyorfikrisztian@taszi.hu', '06304215345', '$argon2id$v=19$m=65536,t=3,p=4$guQuffBOoZCQVxO2+WfNng$GY7ZWKsdzI/sarYr8Mye0A/eJ3yBBIjLBIx3UHVx0Vo');
INSERT INTO `felhasznalok` (`nev`,`email`,`telszam`, `jelszo`) VALUES ('Kis József', 'jozsefkis23@gmail.com', '06709651882', '$argon2id$v=19$m=65536,t=3,p=4$guQuffBOoZCQVxO2+WfNng$GY7ZWKsdzI/sarYr8Mye0A/eJ3yBBIjLBIx3UHVx0Vo');
INSERT INTO `felhasznalok` (`nev`,`email`,`telszam`, `jelszo`) VALUES ('Nagy Attila', 'nattila@freemail.hu', '06301234765', '$argon2id$v=19$m=65536,t=3,p=4$guQuffBOoZCQVxO2+WfNng$GY7ZWKsdzI/sarYr8Mye0A/eJ3yBBIjLBIx3UHVx0Vo');
INSERT INTO `felhasznalok` (`nev`,`email`,`telszam`, `jelszo`) VALUES ('Kovács Bence', 'benceakovacs66@gmail.com', '06206574891', '$argon2id$v=19$m=65536,t=3,p=4$guQuffBOoZCQVxO2+WfNng$GY7ZWKsdzI/sarYr8Mye0A/eJ3yBBIjLBIx3UHVx0Vo');
INSERT INTO `felhasznalok` (`nev`,`email`,`telszam`, `jelszo`) VALUES ('Szabó Anita', 'aszabo0221@taszi.hu', '06702323114', '$argon2id$v=19$m=65536,t=3,p=4$guQuffBOoZCQVxO2+WfNng$GY7ZWKsdzI/sarYr8Mye0A/eJ3yBBIjLBIx3UHVx0Vo');

INSERT INTO `utak` (`indulas`, `indulasiHely`, `veg`, `uticel`, `ar`, `jarmu`, `tervezoId`) VALUES
('2024-03-30 10:20:00.000', 'Hamilton', '2024-03-31 09:30:00.000', 'London', 5000, 'Hajó', 1),
('2024-04-09 09:30:00.000', 'Asmara', '2024-04-10 10:00:00.000', 'Monrovia', 50000, 'Busz', 1),
('2024-03-26 10:20:00.000', 'Nicosia', '2024-03-27 10:20:00.000', 'Pago Pago', 40000, 'Repülőgép', 1),
('2024-04-16 08:00:00.000', 'Ashgabat', '2024-04-16 22:30:00.000', 'Tirana', 20000, 'Repülőgép', 1),
('2024-04-05 09:40:00.000', 'South Tarawa', '2024-04-06 10:40:00.000', 'Ashgabat', 30000, 'Hajó', 1),
('2024-05-11 10:00:00.000', 'Budapest', '2024-05-11 15:30:00.000', 'Bucharest', 2000, 'Vonat', 2),
('2024-06-09 20:30:00.000', 'Dakar', '2024-06-10 03:00:00.000', 'Asmara', 25000, 'Repülőgép', 2),
('2024-04-21 05:15:00.000', 'Zagreb', '2024-04-22 09:00:00.000', 'Dili', 12000, 'Busz', 2),
('2024-07-11 13:00:00.000', 'Warsaw', '2024-07-11 17:30:00.000', 'London', 10000, 'Repülőgép', 2),
('2024-08-01 04:40:00.000', 'Caracas', '2024-08-01 10:40:00.000', 'Rabat', 7000, 'Hajó', 2),
('2025-03-11 12:50:00.000', 'Zagreb', '2025-03-12 04:00:00.000', 'Hamilton', 27000, 'Repülőgép', 3),
('2025-01-17 21:30:00.000', 'Khartoum', '2025-01-18 01:20:00.000', 'Lusaka', 12500, 'Vonat', 3),
('2025-09-26 10:30:00.000', 'Nicosia', '2025-09-26 23:45:00.000', 'Juba', 31000, 'Hajó', 3),
('2025-11-26 16:00:00.000', 'Ouagadougou', '2025-11-27 00:30:00.000', 'Hanoi', 2000, 'Repülőgép', 3),
('2025-12-24 09:40:00.000', 'Budapest', '2025-12-24 14:20:00.000', 'Helsinki', 15000, 'Vonat', 3),
('2024-10-30 09:40:00.000', 'Juba', '2024-10-30 14:20:00.000', 'Ashgabat', 10000, 'Repülőgép', 4),
('2024-06-14 05:15:00.000', 'Bratislava', '2024-06-14 12:30:00.000', 'Ljubljana', 4500, 'Busz', 4),
('2025-09-11 07:30:00.000', 'Kabul', '2025-09-11 09:30:00.000', 'Washington, D.C.', 2996, 'Repülőgép', 4),
('2026-01-23 17:30:00.000', 'Riga', '2026-01-24 02:00:00.000', 'Baku', 40000, 'Vonat', 5),
('2024-07-02 09:00:00.000', 'Berlin', '2024-07-02 11:30:00.000', 'Vienna', 2000, 'Busz', 5);

INSERT INTO `utazasok` (`floId`, `utId`) VALUES
(1, 1),
(1, 3),
(1, 15),
(1, 11),
(1, 7),
(2, 2),
(2, 11),
(2, 5),
(2, 19),
(2, 8),
(3, 1),
(3, 17),
(3, 13),
(3, 10),
(3, 9),
(4, 15),
(4, 11),
(4, 7),
(4, 9),
(4, 20),
(5, 15),
(5, 11),
(5, 3),
(5, 14),
(5, 2);