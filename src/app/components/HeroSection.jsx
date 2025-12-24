"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion"; // <-- ESTA ES LA LÍNEA QUE FALTABA
import Link from "next/link";
import CardMedia from '@mui/material/CardMedia';

const HeroSection = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/hero');
        
        // Verificamos si la respuesta es exitosa antes de parsear
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (Array.isArray(result)) {
          setData(result);
        } else if (result && typeof result === 'object') {
          setData([result]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="py-20 text-white text-center">Cargando...</div>;
  if (data.length === 0) return null;

  return (
    <section className="lg:py-16">
      {data.map((r) => (
        <React.Fragment key={r._id || Math.random()}>
          <div className="grid grid-cols-1 sm:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
            >
              <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
                  Hello, I&apos;m{" "}
                </span>
                <br />
                <TypeAnimation
                  sequence={[
                    "Jhonatan Majin",
                    1000,
                    `${r.title0 || ''}`,
                    1000,
                    `${r.title1 || ''}`,
                    1000,
                    `${r.title2 || ''}`,
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </h1>
              <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
                {r.description}
              </p>
              <div>
                <Link
                  href="/#contact"
                  className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
                >
                  Hire Me
                </Link>
                <Link
                  href="https://drive.google.com/file/d/1bG6jKHvA5_Eqfbya8JaA0N4IrwXjqesN/view?usp=drive_link"
                  target="_blank"
                  className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3"
                >
                  <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                    Download CV
                  </span>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-4 place-self-center mt-4 lg:mt-0"
            >
              <div className="rounded-full bg-[#181818] w-[150px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
                <CardMedia
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  component="img"
                  sx={{ width: '80%', borderRadius: '50%' }}
                  image={r.image}
                  alt="Hero Image"
                />
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      ))}
    </section>
  );
};

export default HeroSection;