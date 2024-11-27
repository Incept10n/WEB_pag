--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: students; Type: TABLE; Schema: public; Owner: paguser
--

CREATE TABLE public.students (
    id integer NOT NULL,
    surname character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    patronymic character varying(50) NOT NULL,
    course integer NOT NULL,
    "group" character varying(15) NOT NULL,
    faculty character varying(100) NOT NULL
);


ALTER TABLE public.students OWNER TO paguser;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: paguser
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.students_id_seq OWNER TO paguser;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: paguser
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: paguser
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: paguser
--

COPY public.students (id, surname, name, patronymic, course, "group", faculty) FROM stdin;
1	Ivanov	Ivan	Ivanovich	1	101A	Engineering
2	Petrov	Petr	Petrovich	1	101A	Engineering
3	Sidorova	Anna	Ivanovna	1	102B	Mathematics
4	Kuznetsov	Vasiliy	Alexeevich	1	103C	Physics
5	Smirnova	Olga	Sergeevna	1	104D	Computer Science
6	Orlova	Ekaterina	Dmitrievna	1	105E	Biology
7	Fedorov	Dmitry	Olegovich	2	201A	Engineering
8	Zhukov	Alexey	Pavlovich	2	202B	Mathematics
9	Titov	Nikolay	Romanovich	2	203C	Physics
10	Novikova	Natalya	Grigoryevna	2	204D	Computer Science
11	Sorokin	Sergey	Igorevich	2	205E	Biology
12	Vlasova	Maria	Andreevna	2	206F	Engineering
13	Koltsov	Yuri	Antonovich	3	301A	Physics
14	Gavrilova	Alina	Petrovna	3	302B	Mathematics
15	Klimov	Egor	Vladimirovich	3	303C	Biology
16	Samsonov	Roman	Leonidovich	3	304D	Computer Science
17	Yakovleva	Vera	Ivanovna	3	305E	Engineering
18	Borisov	Stepan	Alekseevich	3	306F	Mathematics
19	Zaitsev	Andrey	Nikolaevich	4	401A	Physics
20	Mironova	Irina	Sergeevna	4	402B	Biology
21	Lukin	Viktor	Petrovich	4	403C	Engineering
22	Belova	Elena	Maksimovna	4	404D	Mathematics
23	Kolesnikov	Artem	Fedorovich	4	405E	Computer Science
24	Zakharova	Tatiana	Vladislavovna	4	406F	Biology
25	Tikhonov	Denis	Olegovich	1	106A	Physics
26	Pavlov	Pavel	Igorevich	1	107B	Mathematics
27	Abramova	Darya	Konstantinovna	2	207C	Biology
28	Efimov	Maxim	Leonidovich	2	208D	Engineering
29	Gerasimova	Olga	Romanovna	3	307E	Computer Science
30	Shestakov	Mikhail	Alexandrovich	3	308F	Mathematics
31	Panova	Kristina	Timofeevna	4	407A	Biology
32	Litvinov	Sergey	Dmitrievich	4	408B	Physics
33	Koroleva	Polina	Andreevna	1	108C	Engineering
34	Morozov	Vladimir	Yurievich	1	109D	Mathematics
35	Filatova	Svetlana	Olegovna	2	209E	Physics
36	Baranov	Ilya	Igorevich	2	210F	Biology
37	Ponomarev	Vadim	Fedorovich	3	309A	Computer Science
38	Karpova	Irina	Petrovna	3	310B	Mathematics
39	Rodionov	Grigory	Romanovich	4	409C	Engineering
40	Anisimova	Elena	Alexeevna	4	410D	Physics
41	Chistyakov	Konstantin	Yurievich	1	111E	Biology
42	Savelyeva	Ekaterina	Vladimirovna	1	112F	Computer Science
43	Medvedev	Stanislav	Nikolaevich	2	211A	Physics
44	Gromova	Sofia	Ivanovna	2	212B	Engineering
45	Lebedev	Kirill	Alexandrovich	3	311C	Mathematics
46	Voskresenskaya	Nina	Romanovna	3	312D	Biology
47	Nosov	Arkady	Leonidovich	4	411E	Computer Science
48	Rozhkov	Dmitry	Olegovich	4	412F	Physics
\.


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: paguser
--

SELECT pg_catalog.setval('public.students_id_seq', 74, true);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: paguser
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

