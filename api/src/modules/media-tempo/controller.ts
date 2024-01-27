import { Router } from 'express';
import mediaTempoServices from './services';
const { createMediaTempo, deleteMediaTempo, getMediaTempo, updateMediaTempo } = mediaTempoServices;

const router = Router();

router.post('/create/:location', createMediaTempo);
router.put('/edit', updateMediaTempo);
router.delete('/delete', deleteMediaTempo);
router.get('/request', getMediaTempo);



export { router };

