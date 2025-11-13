import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import HealthLog from '@/models/HealthLog';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const { date, weight, waterIntake, calories, sleep } = await req.json();

    const log = await HealthLog.create({
      userId: decoded.userId,
      date: new Date(date),
      weight,
      waterIntake,
      calories,
      sleep,
    });

    return NextResponse.json({
      message: 'Health log created successfully',
      log,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    const logs = await HealthLog.find({ userId: decoded.userId })
      .sort({ date: -1 })
      .limit(30);

    return NextResponse.json({ logs });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
