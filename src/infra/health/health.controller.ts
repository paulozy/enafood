import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly db: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const diskHealth = this.disk.checkStorage('storage', {
      thresholdPercent: 0.75,
      path: '/',
    });

    const memoryHealth = this.memory.checkHeap(
      'memory_heap',
      150 * 1024 * 1024,
    );

    const databaseHealth = this.db.pingCheck('database', new PrismaClient());

    return this.health.check([
      () => diskHealth,
      () => memoryHealth,
      () => databaseHealth,
    ]);
  }
}

/**
 * disk check
 * {
	"status": "ok",
	"info": {
		"storage": {
			"status": "up"
		}
	},
	"error": {},
	"details": {
		"storage": {
			"status": "up"
		}
	}
}
 */

/**
 * memory check
 * {
	"status": "ok",
	"info": {
		"memory_heap": {
			"status": "up"
		}
	},
	"error": {},
	"details": {
		"memory_heap": {
			"status": "up"
		}
	}
}
 */
