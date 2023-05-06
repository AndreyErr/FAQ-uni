--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-06 14:54:51

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

DROP DATABASE "FAQ";
--
-- TOC entry 3390 (class 1262 OID 16398)
-- Name: FAQ; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "FAQ" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';


\connect "FAQ"

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
-- TOC entry 215 (class 1259 OID 16428)
-- Name: faqtype; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.faqtype (
    faqtypeid integer NOT NULL,
    title character varying NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 16427)
-- Name: FaqType_FaqTypeId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."FaqType_FaqTypeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 214
-- Name: FaqType_FaqTypeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."FaqType_FaqTypeId_seq" OWNED BY public.faqtype.faqtypeid;


--
-- TOC entry 223 (class 1259 OID 16479)
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    messageid integer NOT NULL,
    textmessage text NOT NULL,
    fromuser integer NOT NULL,
    dateadd date NOT NULL,
    timeadd time without time zone NOT NULL,
    dialogid integer NOT NULL,
    fileflag boolean
);


--
-- TOC entry 222 (class 1259 OID 16478)
-- Name: dialogEXAMPLE_messageId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."dialogEXAMPLE_messageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 222
-- Name: dialogEXAMPLE_messageId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."dialogEXAMPLE_messageId_seq" OWNED BY public.messages.messageid;


--
-- TOC entry 221 (class 1259 OID 16471)
-- Name: dialogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dialogs (
    dialogid integer NOT NULL,
    askuser integer NOT NULL,
    ansuser integer NOT NULL,
    dateadd date NOT NULL,
    timeadd time without time zone NOT NULL,
    dialogtype integer NOT NULL,
    dialogstatus integer NOT NULL,
    needtoread integer DEFAULT 0
);


--
-- TOC entry 220 (class 1259 OID 16470)
-- Name: dialogs_UniqueID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."dialogs_UniqueID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 220
-- Name: dialogs_UniqueID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."dialogs_UniqueID_seq" OWNED BY public.dialogs.dialogid;


--
-- TOC entry 225 (class 1259 OID 16488)
-- Name: faq; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.faq (
    faqid integer NOT NULL,
    useradd integer NOT NULL,
    usercheck integer,
    typeoffaq integer NOT NULL,
    dateadd date NOT NULL,
    timeadd time without time zone NOT NULL,
    qwest text NOT NULL,
    ans text NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    dislikes integer DEFAULT 0 NOT NULL,
    qwest_text_vector tsvector
);


--
-- TOC entry 224 (class 1259 OID 16487)
-- Name: faq_faqId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."faq_faqId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 224
-- Name: faq_faqId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."faq_faqId_seq" OWNED BY public.faq.faqid;


--
-- TOC entry 227 (class 1259 OID 24713)
-- Name: probability_receiving_chat; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.probability_receiving_chat (
    prob_id integer NOT NULL,
    user_id integer NOT NULL,
    prob integer NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 24712)
-- Name: probability_receiving_chat_prob_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.probability_receiving_chat_prob_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 226
-- Name: probability_receiving_chat_prob_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.probability_receiving_chat_prob_id_seq OWNED BY public.probability_receiving_chat.prob_id;


--
-- TOC entry 217 (class 1259 OID 16458)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    login character varying(120) NOT NULL,
    email character varying(120) NOT NULL,
    pass character varying(120) NOT NULL,
    status integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 16466)
-- Name: usersstatus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usersstatus (
    usersstatusid integer NOT NULL,
    title character varying(120) NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 16465)
-- Name: usersStatus_usersStatusId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."usersStatus_usersStatusId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 218
-- Name: usersStatus_usersStatusId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."usersStatus_usersStatusId_seq" OWNED BY public.usersstatus.usersstatusid;


--
-- TOC entry 216 (class 1259 OID 16457)
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users.user_id;


--
-- TOC entry 3207 (class 2604 OID 16474)
-- Name: dialogs dialogid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dialogs ALTER COLUMN dialogid SET DEFAULT nextval('public."dialogs_UniqueID_seq"'::regclass);


--
-- TOC entry 3210 (class 2604 OID 16491)
-- Name: faq faqid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faq ALTER COLUMN faqid SET DEFAULT nextval('public."faq_faqId_seq"'::regclass);


--
-- TOC entry 3203 (class 2604 OID 16431)
-- Name: faqtype faqtypeid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faqtype ALTER COLUMN faqtypeid SET DEFAULT nextval('public."FaqType_FaqTypeId_seq"'::regclass);


--
-- TOC entry 3209 (class 2604 OID 16482)
-- Name: messages messageid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages ALTER COLUMN messageid SET DEFAULT nextval('public."dialogEXAMPLE_messageId_seq"'::regclass);


--
-- TOC entry 3213 (class 2604 OID 24716)
-- Name: probability_receiving_chat prob_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.probability_receiving_chat ALTER COLUMN prob_id SET DEFAULT nextval('public.probability_receiving_chat_prob_id_seq'::regclass);


--
-- TOC entry 3204 (class 2604 OID 16461)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- TOC entry 3206 (class 2604 OID 16469)
-- Name: usersstatus usersstatusid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usersstatus ALTER COLUMN usersstatusid SET DEFAULT nextval('public."usersStatus_usersStatusId_seq"'::regclass);


--
-- TOC entry 3378 (class 0 OID 16471)
-- Dependencies: 221
-- Data for Name: dialogs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3382 (class 0 OID 16488)
-- Dependencies: 225
-- Data for Name: faq; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3372 (class 0 OID 16428)
-- Dependencies: 215
-- Data for Name: faqtype; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.faqtype (faqtypeid, title) VALUES (1, 'Другое');


--
-- TOC entry 3380 (class 0 OID 16479)
-- Dependencies: 223
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3384 (class 0 OID 24713)
-- Dependencies: 227
-- Data for Name: probability_receiving_chat; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.probability_receiving_chat (prob_id, user_id, prob) VALUES (1, 26, 0);


--
-- TOC entry 3374 (class 0 OID 16458)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users (user_id, login, email, pass, status) VALUES (1, 'aaa', 'aaa@aaa.aaa', '$2b$15$sSblCkzHtcERKbG2hv.aqu4B/4oUH1GM0sL.5M4fJahCBohil3RSC', 5);


--
-- TOC entry 3376 (class 0 OID 16466)
-- Dependencies: 219
-- Data for Name: usersstatus; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usersstatus (usersstatusid, title) VALUES (5, 'Администратор');
INSERT INTO public.usersstatus (usersstatusid, title) VALUES (4, 'Старший модератор');
INSERT INTO public.usersstatus (usersstatusid, title) VALUES (3, 'Модератор');
INSERT INTO public.usersstatus (usersstatusid, title) VALUES (2, 'Премиальный пользователь');
INSERT INTO public.usersstatus (usersstatusid, title) VALUES (1, 'Пользователь');


--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 214
-- Name: FaqType_FaqTypeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."FaqType_FaqTypeId_seq"', 48, true);


--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 222
-- Name: dialogEXAMPLE_messageId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."dialogEXAMPLE_messageId_seq"', 4952, true);


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 220
-- Name: dialogs_UniqueID_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."dialogs_UniqueID_seq"', 3138, true);


--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 224
-- Name: faq_faqId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."faq_faqId_seq"', 104, true);


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 226
-- Name: probability_receiving_chat_prob_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.probability_receiving_chat_prob_id_seq', 33, true);


--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 218
-- Name: usersStatus_usersStatusId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."usersStatus_usersStatusId_seq"', 1, false);


--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 50, true);


--
-- TOC entry 3215 (class 2606 OID 16435)
-- Name: faqtype FaqType_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faqtype
    ADD CONSTRAINT "FaqType_pkey" PRIMARY KEY (faqtypeid);


--
-- TOC entry 3223 (class 2606 OID 16486)
-- Name: messages dialogEXAMPLE_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "dialogEXAMPLE_pkey" PRIMARY KEY (messageid);


--
-- TOC entry 3221 (class 2606 OID 16476)
-- Name: dialogs dialogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dialogs
    ADD CONSTRAINT dialogs_pkey PRIMARY KEY (dialogid);


--
-- TOC entry 3225 (class 2606 OID 16497)
-- Name: faq faq_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faq
    ADD CONSTRAINT faq_pkey PRIMARY KEY (faqid);


--
-- TOC entry 3228 (class 2606 OID 24718)
-- Name: probability_receiving_chat probability_receiving_chat_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.probability_receiving_chat
    ADD CONSTRAINT probability_receiving_chat_pkey PRIMARY KEY (prob_id);


--
-- TOC entry 3217 (class 2606 OID 16464)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3219 (class 2606 OID 16506)
-- Name: usersstatus usersstatus_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usersstatus
    ADD CONSTRAINT usersstatus_pkey PRIMARY KEY (usersstatusid);


--
-- TOC entry 3226 (class 1259 OID 24699)
-- Name: index_on_qwest; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_on_qwest ON public.faq USING btree (qwest);


-- Completed on 2023-05-06 14:54:51

--
-- PostgreSQL database dump complete
--

