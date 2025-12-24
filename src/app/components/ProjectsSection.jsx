"use client";
import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { motion, useInView } from "framer-motion";

const ProjectsSection = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/admin/project');
        
        if (!response.ok) {
          throw new Error(`Error al cargar proyectos: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // if (isLoading) {
  //   return (
  //     <section id="projects" className="py-20">
  //       <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
  //         My Projects
  //       </h2>
  //       <div className="text-center text-white">
  //         <div className="animate-pulse">Cargando proyectos...</div>
  //       </div>
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section id="projects" className="py-20">
  //       <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
  //         My Projects
  //       </h2>
  //       <div className="text-center text-red-400">
  //         Error al cargar proyectos: {error}
  //       </div>
  //     </section>
  //   );
  // }

  if (!data || data.length === 0) {
    return (
      <section id="projects" className="py-20">
        <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
          My Projects
        </h2>
        <div className="text-center text-gray-400">
          No hay proyectos disponibles
        </div>
      </section>
    );
  }

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
       <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
          {data?.map((project, index) => (
            <motion.li
              key={project._id}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.4 }}
            >
              <ProjectCard
                key={project._id}
                title={project.title}
                description={project.description}
                image={project.image}
                github={project.github}
                web={project.web}
                tag2={project.tag2}
              />
            </motion.li>
          ))}
        </ul>
    </section>
  );
};

export default ProjectsSection;
