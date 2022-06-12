""" 何回も情報取得 """

import time

import releasemark
import datacollector

INTERVAL_MINUTES = 5
REMAIN_SECONDS = 10

def main():
    """ main """
    print("********************************")
    print("      大分県コロナ情報取得")
    print("********************************")
    try:
        while True:
            if releasemark.is_today_marked():
                print("本日の更新は取得済みです。")
                break
            else:
                print("情報を取得します...")
                for report in datacollector.collect_new_data_with_report():
                    print(report)
                if releasemark.is_today_marked():
                    break
                print(f"{INTERVAL_MINUTES}分 待機します...")
                time.sleep(INTERVAL_MINUTES * 60)
        for i in reversed(range(1, REMAIN_SECONDS + 1)):
            print("\r" + f"{i:>2} 秒後に自動で閉じます...", end="")
            time.sleep(1)
    except Exception as ex:
        print(f"例外発生： {ex}")
        input("hit enter...")

if __name__ == ("__main__"):
    main()
