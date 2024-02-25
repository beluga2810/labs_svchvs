PGDMP      ;                |            dairy_plant    16.0    16.0 #    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    36881    dairy_plant    DATABASE     �   CREATE DATABASE dairy_plant WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1251';
    DROP DATABASE dairy_plant;
                postgres    false            �            1259    36890    Members    TABLE     B  CREATE TABLE public."Members" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    contact character varying(255) NOT NULL,
    experience character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "PositionId" integer
);
    DROP TABLE public."Members";
       public         heap    postgres    false            �            1259    36889    Members_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Members_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Members_id_seq";
       public          postgres    false    218            �           0    0    Members_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Members_id_seq" OWNED BY public."Members".id;
          public          postgres    false    217            �            1259    36883 	   Positions    TABLE     �   CREATE TABLE public."Positions" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Positions";
       public         heap    postgres    false            �            1259    36882    Positions_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Positions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Positions_id_seq";
       public          postgres    false    216            �           0    0    Positions_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Positions_id_seq" OWNED BY public."Positions".id;
          public          postgres    false    215            �            1259    36904 	   Schedules    TABLE     W  CREATE TABLE public."Schedules" (
    id integer NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    room character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "PositionId" integer
);
    DROP TABLE public."Schedules";
       public         heap    postgres    false            �            1259    36903    Schedules_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Schedules_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Schedules_id_seq";
       public          postgres    false    220            �           0    0    Schedules_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Schedules_id_seq" OWNED BY public."Schedules".id;
          public          postgres    false    219            �            1259    36929    Users    TABLE     G  CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'user'::character varying NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    36928    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    222            �           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    221            *           2604    36893 
   Members id    DEFAULT     l   ALTER TABLE ONLY public."Members" ALTER COLUMN id SET DEFAULT nextval('public."Members_id_seq"'::regclass);
 ;   ALTER TABLE public."Members" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            )           2604    36886    Positions id    DEFAULT     p   ALTER TABLE ONLY public."Positions" ALTER COLUMN id SET DEFAULT nextval('public."Positions_id_seq"'::regclass);
 =   ALTER TABLE public."Positions" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            +           2604    36907    Schedules id    DEFAULT     p   ALTER TABLE ONLY public."Schedules" ALTER COLUMN id SET DEFAULT nextval('public."Schedules_id_seq"'::regclass);
 =   ALTER TABLE public."Schedules" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            ,           2604    36932    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �          0    36890    Members 
   TABLE DATA           j   COPY public."Members" (id, name, contact, experience, "createdAt", "updatedAt", "PositionId") FROM stdin;
    public          postgres    false    218   �(       �          0    36883 	   Positions 
   TABLE DATA           I   COPY public."Positions" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   u)       �          0    36904 	   Schedules 
   TABLE DATA           m   COPY public."Schedules" (id, date, "time", room, status, "createdAt", "updatedAt", "PositionId") FROM stdin;
    public          postgres    false    220   �)       �          0    36929    Users 
   TABLE DATA           Y   COPY public."Users" (id, username, password, role, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    222   �*       �           0    0    Members_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Members_id_seq"', 4, true);
          public          postgres    false    217            �           0    0    Positions_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Positions_id_seq"', 2, true);
          public          postgres    false    215            �           0    0    Schedules_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Schedules_id_seq"', 7, true);
          public          postgres    false    219            �           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 1, true);
          public          postgres    false    221            1           2606    36897    Members Members_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Members"
    ADD CONSTRAINT "Members_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Members" DROP CONSTRAINT "Members_pkey";
       public            postgres    false    218            /           2606    36888    Positions Positions_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Positions"
    ADD CONSTRAINT "Positions_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Positions" DROP CONSTRAINT "Positions_pkey";
       public            postgres    false    216            3           2606    36911    Schedules Schedules_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Schedules"
    ADD CONSTRAINT "Schedules_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Schedules" DROP CONSTRAINT "Schedules_pkey";
       public            postgres    false    220            5           2606    36937    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    222            7           2606    36939    Users Users_username_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);
 F   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_username_key";
       public            postgres    false    222            8           2606    36898    Members Members_PositionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Members"
    ADD CONSTRAINT "Members_PositionId_fkey" FOREIGN KEY ("PositionId") REFERENCES public."Positions"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public."Members" DROP CONSTRAINT "Members_PositionId_fkey";
       public          postgres    false    218    216    4655            9           2606    36912 #   Schedules Schedules_PositionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Schedules"
    ADD CONSTRAINT "Schedules_PositionId_fkey" FOREIGN KEY ("PositionId") REFERENCES public."Positions"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public."Schedules" DROP CONSTRAINT "Schedules_PositionId_fkey";
       public          postgres    false    220    4655    216            �   �   x���AN�0еs�쫩�GMz3�X�fv,�� R�g���� �.Η���37~q���ny�֎�u�VF+%�D��O������Qӄqz@R7�R�$|�����sx�a�=���n�l�|��͓��Lx�W�c��qqw�v�Wf�e�~������G���˼���ܤ�ŪKޫ�_Vju�a2�5_��C�S���      �   a   x�3�0�¾�/��~a���;.6]�z���^���͜FF&�F�F�
F�V��V�zF���&���e��8/� ���V ��bE���qqq �:[      �   �   x���M
�0�דSd/��I�d��a������=��F��t�
����뀑�����l����:x;�Ž��j�b�,JY1�)�lP>Q�/����ɚ�j�������R
��	��+&,o�G}�獞�FT�PJ^����{ ����      �   7   x�3�,�442�,-N-�4202�50�52Q02�24�24�330�60�#����� ��     