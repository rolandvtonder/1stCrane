import { mount } from './mount.jsx';
import Layout from '../components/Layout.jsx';
import Hero from '../components/home/Hero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import {
  About,
  Fleet,
  Industries,
  Projects,
  SaleTeaser,
  Safety,
  Services,
} from '../components/home/HomeSections.jsx';

mount(
  <Layout current="home">
    <Hero />
    <About />
    <Services />
    <Fleet />
    <Industries />
    <Safety />
    <Projects />
    <SaleTeaser />
    <CtaBand image="billboard-lift-wide" focus="18% 45%" align="right" />
  </Layout>
);
