import '@core/component';
import Core from '@core/core';
import '@core/tag';

import '@game/title/font-loader.js';

import { createTestData } from '@game/title/test-data.js';

// General Mechanics
import GuiSystem from '@game/engine/gui/gui-system';
import LightSystem from '@game/engine/lighting/light-system';
import RenderSystem from '@game/engine/renderer/render-system';
import RenderRenderablesSystem from '@game/engine/renderer/render-renderables-system';
import TimerSystem from '@game/engine/timer/timer-system';
import Cursorable from '@game/tracker/cursorable';
import MouseTrackerSystem from '@game/tracker/mouse-tracker-system';

import AudioListener from '@game/engine/audio/audio-listener-tag';
import AudioSystem from '@game/engine/audio/audio-system';
import GuiCanvasRenderable from '@game/engine/gui/gui-canvas-renderable-tag';
import InputSystem from '@game/engine/input/input-system';
import ParticleSystem from '@game/engine/particle/particle-system';
import ViewportSystem from '@game/engine/renderer/viewport-system';

// Base gameplay systems
import MovementFinalizationSystem from '@game/engine/movement/movement-finalization-system';
import MovementProposalSystem from '@game/engine/movement/movement-proposal-system';

// Game-specific Mechanics
import InputConfigurationSystem from '@game/specifics/configuration/input-configuration-system';

// Weapons
    
import TurnsTowardsSystem from '@game/features/turn-towards-cursor/turns-towards-system';
import TurnsTowards from '@game/features/turn-towards-cursor/turns-towards-tag';



// Tags
import Lightable from '@game/engine/lighting/lightable-tag';
import Movable from '@game/engine/movement/movement-tags';
import Renderable from '@game/engine/renderer/render-tags';
import Timer from '@game/engine/timer/timer-tag';

//Debug systems
import Collidable from '@game/engine/collision/collidable-tag';
import CollisionSystem from '@game/engine/collision/collision-system';
import Shadowable from '@game/engine/lighting/shadowable-tag';
import ViewportFollowable from '@game/engine/renderer/viewport-followable-tag';
import DebugUiSystem from '@game/specifics/debug/debug-ui-system';
import Attached from '../engine/attachments/attached-tag';
import AttachmentSyncSystem from '../engine/attachments/attachment-sync-system';
import CollisionConfigurationSystem from '../specifics/configuration/collision-configuration-system';


import AiSystem from '@game/engine/ai/ai-system';
import AssetLoaderSystem from '@game/engine/assets/asset-loader-system';
import MapGeneratorSystem from '@game/engine/generators/map-generator-system';
import PropGeneratorSystem from '@game/engine/generators/prop-generator-system';
import Ai from '../engine/ai/ai-tag';
import HasLogic from '../engine/logic/has-logic';
import LogicSystem from '../engine/logic/logic-system';
import Material from '../engine/material/material-tag';
import ParticleEmitter from '../engine/particle/particle-emitter-tag';
import TextureSystem from '../engine/renderer/texture-system';
import DistanceTrack from '../engine/tracker/distance-track-tag';
import DistanceTrackerSystem from '../engine/tracker/distance-tracker-system';
import AiStateInformerSystem from '../features/ai/informers/ai-state-informer-system';
import DoorOpener from '../features/door/door-opener';
import DoorSystem from '../features/door/door-system';
import Door from '../features/door/door-tag';
import FootstepFxSystem from '../features/footstep-fx/footstep-fx-system';
import HasFootsteps from '../features/footstep-fx/has-footsteps-tag';
import DustParticleFxSystem from '../features/fx/dust-particle-fx-system';
import TrailEmitter from '../features/trail-fx/trail-emitter-tag';
import TrailSystem from '../features/trail-fx/trail-system';
import TrailZone from '../features/trail-fx/trail-zone-tag';
import AiConfigurationSystem from '../specifics/configuration/ai-configuration-system';
import AssetConfigurationSystem from '../specifics/configuration/assets/asset-configuration-system';
import LogicConfigurationSystem from '../specifics/configuration/logic/logic-configuration-system';
import ClockSystem from '../features/clock/clock-system';
import SceneConfigurationSystem from '../specifics/configuration/scene-configuration-system';
import FxSystem from '../features/fx/fx-system';
import FxConfigurationSystem from '../specifics/configuration/fx-configuration-system';
import EventOrchestratorSystem from '../features/event-orchestrator/event-orchestrator-system';
import PlayerControlIntentSystem from '../features/player-control/player-control-intent-system';

export function startGame() {

    ////
    // Generic systems
    ////
    // Rendering
    Core.addSystem(new RenderSystem())
        Core.addSystem(new RenderRenderablesSystem())
            Core.addTag(Renderable)
        Core.addSystem(new TextureSystem());


    // GUI
    Core.addSystem(new GuiSystem())
        Core.addTag(GuiCanvasRenderable)

    // Loaders and Gnerators
    Core.addSystem(new AssetLoaderSystem());
        Core.addSystem(new PropGeneratorSystem());
        Core.addSystem(new MapGeneratorSystem());

    // Camera
    Core.addSystem(new ViewportSystem());
        Core.addTag(ViewportFollowable)

    // Audio
    Core.addSystem(new AudioSystem());
        Core.addTag(AudioListener);

    //Lighting (Shadow by Default)
    // Core.addSystem(new LightSystem())
    //     Core.addTag(Lightable)
    //     Core.addTag(Shadowable)

    // Input
    Core.addSystem(new InputSystem())
        Core.addSystem(new MouseTrackerSystem());

    // Per-entity logic
    Core.addSystem(new LogicSystem());
        Core.addTag(HasLogic)


    // Extras
    Core.addSystem(new ParticleSystem());
        Core.addTag(ParticleEmitter);
    

    // Movement and attached object syncing [ordering matters here]
    Core.addSystem(new MovementProposalSystem());
        Core.addTag(Movable);
        Core.addSystem(new DistanceTrackerSystem());
            Core.addTag(DistanceTrack);
        Core.addSystem(new CollisionSystem());
            Core.addTag(Collidable);
    Core.addSystem(new MovementFinalizationSystem());
    Core.addSystem(new AttachmentSyncSystem())
        Core.addTag(Attached)
    


    // Ambience
    Core.addSystem(new FxSystem());
    
    
    // Utilities
    Core.addSystem(new TimerSystem());
        Core.addTag(Timer);

    // Generic tags
    Core.addTag(Cursorable);


    ////
    // Features
    ////

    //Gameplay
    Core.addSystem(new TurnsTowardsSystem());
        Core.addTag(TurnsTowards);

    // FX
    Core.addTag(Material);
    Core.addSystem(new FootstepFxSystem());
        Core.addTag(HasFootsteps);
    Core.addSystem(new TrailSystem());
        Core.addTag(TrailZone);
        Core.addTag(TrailEmitter);
    Core.addSystem(new DustParticleFxSystem())


    // Prop Logic
    Core.addSystem(new DoorSystem());
        Core.addTag(Door);
        Core.addTag(DoorOpener);

    ////
    // Game-specific configuration
    ////

    Core.addSystem(new EventOrchestratorSystem());

    // Game Specific Configuration
    Core.addSystem(new InputConfigurationSystem());
    Core.addSystem(new CollisionConfigurationSystem());
    Core.addSystem(new AiConfigurationSystem())
    Core.addSystem(new LogicConfigurationSystem());
    Core.addSystem(new AssetConfigurationSystem()); // Must go after logic
    Core.addSystem(new SceneConfigurationSystem());
    Core.addSystem(new FxConfigurationSystem())


    //Debug
    Core.addSystem(new DebugUiSystem());

    /////
    Core.addSystem(new ClockSystem());
    Core.addSystem(new PlayerControlIntentSystem());
    /////


    Core.start();

    setTimeout(() => {
        createTestData();
    }, 500)
} 